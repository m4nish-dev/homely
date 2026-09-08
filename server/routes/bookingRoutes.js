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

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new property booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [property, checkIn, checkOut, guests]
 *             properties:
 *               property:
 *                 type: string
 *                 description: Property ID
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               guests:
 *                 type: object
 *                 properties:
 *                   adults:
 *                     type: number
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Property not available
 */
router.post('/', createBookingValidator, validate, createBooking);

/**
 * @swagger
 * /api/bookings/my-bookings:
 *   get:
 *     summary: Get logged in user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/my-bookings', getMyBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 */
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

export default router;
