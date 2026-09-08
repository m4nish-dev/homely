import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createBookingValidator } from '../middleware/validators.js';

const router = express.Router();

// Enforce authentication for all booking routes
router.use(protect);

// Admin route must be placed before /:id to prevent route shadowing
router.get('/admin/all', authorize('admin'), getAllBookings);

router.post('/', createBookingValidator, validate, createBooking);
router.get('/my-bookings', getMyBookings);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

export default router;
