import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  checkAvailability,
  getMyProperties,
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
router.get(
  '/host/my-properties',
  protect,
  authorize('host', 'admin'),
  getMyProperties
);
router.post(
  '/',
  protect,
  authorize('host', 'admin'),
  upload.array('images', 10),
  (req, res, next) => {
    if (req.body.location && typeof req.body.location === 'string') {
      try { req.body.location = JSON.parse(req.body.location); } catch (e) {}
    }
    if (req.body.amenities && typeof req.body.amenities === 'string') {
      try { req.body.amenities = JSON.parse(req.body.amenities); } catch (e) {}
    }
    next();
  },
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
