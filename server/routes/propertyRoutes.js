import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  checkAvailability,
} from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createPropertyValidator } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getPropertyById);
router.post('/:id/availability', checkAvailability);

// Protected routes (Host or Admin only)
router.post(
  '/',
  protect,
  authorize('host', 'admin'),
  upload.array('images', 10),
  createPropertyValidator,
  validate,
  createProperty
);

router.put(
  '/:id',
  protect,
  authorize('host', 'admin'),
  upload.array('images', 10),
  updateProperty
);

router.delete(
  '/:id',
  protect,
  authorize('host', 'admin'),
  deleteProperty
);

export default router;
