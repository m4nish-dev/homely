import crypto from 'crypto';
import Razorpay from 'razorpay';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create Razorpay Order
// @route   POST /api/payments/order
// @access  Private
export const createOrder = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Security check: Only the user who booked it can generate the payment order
  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this booking');
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Math.round(booking.totalAmount * 100), // Convert ₹ to Paise
    currency: 'INR',
    receipt: booking.bookingId, // Use the human-readable HM123456 ID
    notes: {
      bookingDbId: booking._id.toString(),
    },
  };

  // Generate Order on Razorpay's servers
  const order = await razorpay.orders.create(options);

  // Create local Payment Document lifecycle
  const payment = await Payment.create({
    booking: booking._id,
    user: req.user._id,
    razorpayOrderId: order.id,
    amount: booking.totalAmount,
    currency: 'INR',
    status: 'created',
  });

  // Link payment document back to the booking
  booking.payment = payment._id;
  await booking.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID, // Send key to frontend checkout script
  });
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = asyncHandler(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

  if (!payment) {
    res.status(404);
    throw new Error('Payment record not found');
  }

  // Mathematically compute what the signature *should* be using our private secret
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    payment.status = 'failed';
    await payment.save();
    
    const booking = await Booking.findById(payment.booking);
    if (booking) {
      booking.paymentStatus = 'failed';
      await booking.save({ validateBeforeSave: false });
    }

    res.status(400);
    throw new Error('Invalid payment signature - potential spoofing attack');
  }

  // Signatures match securely
  payment.status = 'paid';
  payment.razorpayPaymentId = razorpay_payment_id;
  payment.razorpaySignature = razorpay_signature;
  await payment.save();

  // Mark booking as fully confirmed
  const booking = await Booking.findById(payment.booking).populate('user', 'name email');
  booking.status = 'confirmed';
  booking.paymentStatus = 'paid';
  await booking.save({ validateBeforeSave: false });

  // Transact Email Confirmation
  const message = `Hello ${booking.user.name}, \n\nYour payment of ₹${payment.amount} was successful. Your Homely booking (ID: ${booking.bookingId}) is 100% confirmed! Enjoy your stay.`;
  
  try {
    await sendEmail({
      email: booking.user.email,
      subject: 'Booking Confirmed - Homely',
      message,
    });
  } catch (err) {
    console.error('Email confirmation could not be sent:', err);
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

// @desc    Razorpay Webhook handler (Server-to-Server reliability)
// @route   POST /api/payments/webhook
// @access  Public
export const webhook = asyncHandler(async (req, res, next) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  // IMPORTANT: Razorpay expects the raw buffer/string to compute the HMAC.
  // Because we configured express.raw() in app.js, req.body is already a Buffer here.
  const rawBody = Buffer.isBuffer(req.body) ? req.body : JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (expectedSignature !== signature) {
    return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  // Idempotent checks to prevent race conditions with frontend verifyPayment route
  if (event === 'payment.captured') {
    const paymentEntity = payload.payment.entity;
    const orderId = paymentEntity.order_id;
    
    const payment = await Payment.findOne({ razorpayOrderId: orderId });
    if (payment && payment.status !== 'paid') {
      payment.status = 'paid';
      payment.razorpayPaymentId = paymentEntity.id;
      await payment.save();

      const booking = await Booking.findById(payment.booking);
      if (booking && booking.paymentStatus !== 'paid') {
        booking.status = 'confirmed';
        booking.paymentStatus = 'paid';
        await booking.save({ validateBeforeSave: false });
      }
    }
  } else if (event === 'payment.failed') {
    const paymentEntity = payload.payment.entity;
    const orderId = paymentEntity.order_id;

    const payment = await Payment.findOne({ razorpayOrderId: orderId });
    if (payment && payment.status !== 'failed') {
      payment.status = 'failed';
      payment.failureReason = paymentEntity.error_description || 'Payment failed';
      await payment.save();

      const booking = await Booking.findById(payment.booking);
      if (booking && booking.paymentStatus !== 'failed') {
        booking.paymentStatus = 'failed';
        await booking.save({ validateBeforeSave: false });
      }
    }
  } else if (event === 'refund.processed') {
    const refundEntity = payload.refund.entity;
    const paymentId = refundEntity.payment_id;

    const payment = await Payment.findOne({ razorpayPaymentId: paymentId });
    if (payment && payment.status !== 'refunded') {
      payment.status = 'refunded';
      payment.refundId = refundEntity.id;
      payment.refundAmount = refundEntity.amount / 100;
      await payment.save();

      const booking = await Booking.findById(payment.booking);
      if (booking && booking.paymentStatus !== 'refunded') {
        booking.paymentStatus = 'refunded';
        await booking.save({ validateBeforeSave: false });
      }
    }
  }

  // Always return 200 to acknowledge receipt to Razorpay
  res.status(200).json({ success: true });
});

// @desc    Helper to initiate refund (Internal)
// @access  Internal Server Call from CancelBooking controller
export const initiateRefund = async (bookingId, reason) => {
  const booking = await Booking.findById(bookingId);
  if (!booking || booking.paymentStatus !== 'paid') {
    throw new Error('Booking is not eligible for refund');
  }

  const payment = await Payment.findById(booking.payment);
  if (!payment || !payment.razorpayPaymentId) {
    throw new Error('Payment records missing for this booking');
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Call Razorpay API to issue the monetary refund
  const refund = await razorpay.payments.refund(payment.razorpayPaymentId, {
    amount: payment.amount * 100, // paise
    notes: {
      reason: reason || 'Cancellation requested',
      bookingId: booking._id.toString()
    }
  });

  // Update DB synchronously for immediate UI feedback (Webhook acts as backup)
  payment.status = 'refunded';
  payment.refundId = refund.id;
  payment.refundAmount = refund.amount / 100;
  await payment.save();

  booking.paymentStatus = 'refunded';
  await booking.save({ validateBeforeSave: false });

  return refund;
};
