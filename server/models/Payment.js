import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['created', 'attempted', 'paid', 'failed', 'refunded'],
      default: 'created',
    },
    method: {
      type: String, // e.g., 'card', 'upi', 'netbanking', 'wallet'
    },
    refundId: {
      type: String,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    failureReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;