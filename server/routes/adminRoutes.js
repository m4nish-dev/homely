import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  toggleFeaturedProperty,
  toggleActiveProperty,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Enforce double authentication: Must be logged in AND have 'admin' role
router.use(protect);
router.use(authorize('admin'));

// Dashboard Statistics
router.get('/dashboard', getDashboardStats);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Property Management
router.put('/properties/:id/feature', toggleFeaturedProperty);
router.put('/properties/:id/active', toggleActiveProperty);

export default router;
