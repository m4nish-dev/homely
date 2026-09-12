import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res, next) => {
  const { property: propertyId, checkIn, checkOut, guests, guestDetails, specialRequests } = req.body;

  // 1. Initial date validation
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkInDate < today) {
    res.status(400);
    throw new Error('Check-in date cannot be in the past');
  }

  if (checkOutDate <= checkInDate) {
    res.status(400);
    throw new Error('Check-out date must be after check-in date');
  }

  // CRITICAL: Mongoose Transaction to prevent race conditions (double bookings)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const property = await Property.findById(propertyId).session(session);

    if (!property || !property.isActive) {
      res.status(404);
      throw new Error('Property not found or is inactive');
    }

    // Call instance method to check availability
    const isAvailable = property.isAvailable(checkInDate, checkOutDate);
    if (!isAvailable) {
      res.status(409);
      throw new Error('Dates not available. The property was already booked for this timeframe.');
    }

    // Calculations
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const pricePerNight = property.price;
    const subtotal = pricePerNight * nights;
    const serviceFee = 499;
    const taxes = 0; // Customize taxes logic here if needed
    const totalAmount = subtotal + serviceFee + taxes;

    // Create Booking
    const newBooking = new Booking({
      user: req.user._id,
      property: propertyId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      guestDetails,
      specialRequests,
      nights,
      pricePerNight,
      subtotal,
      serviceFee,
      taxes,
      totalAmount,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // We must validate & save within session
    await newBooking.save({ session });

    // Push to property.bookedDates
    property.bookedDates.push({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      bookingId: newBooking._id
    });

    await property.save({ session });

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      booking: newBooking
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('property', 'title images location price');

  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings
  });
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate('property')
    .populate('user', 'name email');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Ownership check
  if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this booking');
  }

  res.status(200).json({
    success: true,
    booking
  });
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Ownership check
  if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to cancel this booking');
  }

  if (booking.status === 'cancelled' || booking.status === 'completed') {
    res.status(400);
    throw new Error(`Cannot cancel a booking that is already ${booking.status}`);
  }

  // 24hr cancellation window check
  const now = new Date();
  const checkInDate = new Date(booking.checkIn);
  const diffHours = (checkInDate - now) / (1000 * 60 * 60);

  if (diffHours <= 24 && req.user.role !== 'admin') {
    res.status(400);
    throw new Error('Cancellation window closed. You cannot cancel within 24 hours of check-in.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Update Booking Status
    booking.status = 'cancelled';
    booking.cancellationReason = req.body.cancellationReason || 'User requested cancellation';
    booking.cancelledAt = Date.now();
    await booking.save({ session });

    // 2. Remove booked dates from property
    const property = await Property.findById(booking.property).session(session);
    if (property) {
      property.bookedDates = property.bookedDates.filter(
        (bd) => bd.bookingId && bd.bookingId.toString() !== booking._id.toString()
      );
      await property.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    // Trigger refund lazily if paid
    if (booking.paymentStatus === 'paid') {
      try {
        const { initiateRefund } = await import('./paymentController.js');
        await initiateRefund(booking._id, booking.cancellationReason);
      } catch (refundError) {
        console.error('Failed to initiate refund automatically:', refundError);
        // Refund failed but booking is cancelled. 
        // A retry mechanism or admin manual refund could be handled here.
      }
    }

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 10 } = req.query;
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const bookings = await Booking.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .populate('user', 'name email')
    .populate('property', 'title location');

  const total = await Booking.countDocuments(query);
  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    success: true,
    count: bookings.length,
    page: pageNum,
    totalPages,
    total,
    bookings
  });
});

// @desc    Get public invoice details for direct view/download without login
// @route   GET /api/bookings/public-invoice/:bookingId
// @access  Public
export const getPublicInvoice = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const isMongoId = mongoose.isValidObjectId(bookingId);
  const query = isMongoId 
    ? { $or: [{ _id: bookingId }, { bookingId }] } 
    : { bookingId };

  const booking = await Booking.findOne(query)
    .populate('user', 'name email phone')
    .populate('property', 'title location price images host address city');

  if (!booking) {
    res.status(404);
    throw new Error('Invoice or booking record not found');
  }

  res.status(200).json({
    success: true,
    booking
  });
});

