import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res, next) => {
  const { propertyId, rating, comment, bookingId } = req.body;

  // 1. Verify the booking exists and belongs to the user
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to review this booking');
  }

  // 2. Ensure they actually stayed at the property (completed)
  if (booking.status !== 'completed') {
    res.status(400);
    throw new Error('You can only review a property after your stay is completed');
  }

  if (booking.property.toString() !== propertyId) {
    res.status(400);
    throw new Error('Property ID does not match the booking record');
  }

  // 3. Ensure they haven't already reviewed this property (compound index check)
  const existingReview = await Review.findOne({
    user: req.user._id,
    property: propertyId,
  });

  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this property');
  }

  // 4. Create the review
  const review = await Review.create({
    user: req.user._id,
    property: propertyId,
    booking: bookingId,
    rating: Number(rating),
    comment,
  });

  // Note: The Review model has a post-save hook that automatically aggregates
  // the new average rating and pushes it to the Property document!

  res.status(201).json({
    success: true,
    review,
  });
});

// @desc    Get reviews for a property
// @route   GET /api/reviews/property/:propertyId
// @access  Public
export const getPropertyReviews = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const reviews = await Review.find({ property: propertyId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await Review.countDocuments({ property: propertyId });
  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    success: true,
    count: reviews.length,
    page: pageNum,
    totalPages,
    total,
    reviews,
  });
});

// @desc    Update an existing review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Ownership check
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this review');
  }

  review.rating = rating !== undefined ? Number(rating) : review.rating;
  review.comment = comment || review.comment;

  // We use .save() instead of findByIdAndUpdate so that our post-save hook
  // triggers and accurately recalculates the property's new average rating!
  await review.save();

  res.status(200).json({
    success: true,
    review,
  });
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Ownership check OR Admin access
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this review');
  }

  // We use .deleteOne() because we strictly defined the 'deleteOne' document hook 
  // in Review.js to recalculate the property's rating after deletion!
  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Review successfully deleted',
  });
});
