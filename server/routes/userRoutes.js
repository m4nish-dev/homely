import express from 'express';
import {
  updateProfile,
  updateAvatar,
  addFavorite,
  removeFavorite,
  getFavorites,
  deleteAccount,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Enforce authentication on all user routes
router.use(protect);

// Favorites Management
router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:propertyId', removeFavorite);

// Profile Management
router.put('/profile', updateProfile);
router.put('/avatar', upload.single('avatar'), updateAvatar);
router.delete('/account', deleteAccount);

export default router;
