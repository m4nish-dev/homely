import express from 'express';
import {
  createOrder,
  verifyPayment,
  webhook,
  initiateRefund,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Wrap the internal initiateRefund helper into an Express route handler
const refundHandler = asyncHandler(async (req, res, next) => {
  const refund = await initiateRefund(req.params.bookingId, req.body.reason);
  res.status(200).json({ success: true, refund });
});

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);

// Note: This webhook route is shadowed/intercepted in app.js via express.raw()
// to guarantee the signature payload remains unmodified by the JSON parser.
router.post('/webhook', webhook);

router.post('/:bookingId/refund', protect, authorize('admin'), refundHandler);

export default router;
