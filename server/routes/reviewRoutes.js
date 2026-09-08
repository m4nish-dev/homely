import express from 'express';
import {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createReviewValidator } from '../middleware/validators.js';

const router = express.Router();

// Public route to fetch reviews
router.get('/property/:propertyId', getPropertyReviews);

// Protected routes
router.post('/', protect, createReviewValidator, validate, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
