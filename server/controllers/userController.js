import User from '../models/User.js';
import Property from '../models/Property.js';
import asyncHandler from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../middleware/uploadMiddleware.js';

// @desc    Update user profile details
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Handle Email Update with strict collision detection
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email is already in use by another account');
    }
    user.email = req.body.email;
  }

  // Update primitive details
  user.name = req.body.name || user.name;
  if (req.body.phone !== undefined) {
    user.phone = req.body.phone;
  }

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
export const updateAvatar = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image file');
  }

  // If user already has a custom avatar hosted on Cloudinary, securely destroy it
  if (user.avatar && user.avatar.publicId) {
    await deleteFromCloudinary(user.avatar.publicId);
  }

  // Stream new avatar buffer directly to Cloudinary
  const result = await uploadToCloudinary(req.file.buffer, 'homely/avatars');

  user.avatar = {
    url: result.url,
    publicId: result.publicId,
  };

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});

// @desc    Add property to favorites
// @route   POST /api/users/favorites
// @access  Private
export const addFavorite = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.body;

  const property = await Property.findById(propertyId);
  if (!property || !property.isActive) {
    res.status(404);
    throw new Error('Property not found');
  }

  // $addToSet atomically inserts if not present, preventing duplicates
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { favorites: propertyId } },
    { new: true }
  ).populate('favorites', 'title price images location rating');

  res.status(200).json({
    success: true,
    favorites: user.favorites,
  });
});

// @desc    Remove property from favorites
// @route   DELETE /api/users/favorites/:propertyId
// @access  Private
export const removeFavorite = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.params;

  // $pull atomically removes matches from the array
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { favorites: propertyId } },
    { new: true }
  ).populate('favorites', 'title price images location rating');

  res.status(200).json({
    success: true,
    favorites: user.favorites,
  });
});

// @desc    Get logged in user's favorites
// @route   GET /api/users/favorites
// @access  Private
export const getFavorites = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate(
    'favorites',
    'title price images location rating'
  );

  res.status(200).json({
    success: true,
    favorites: user.favorites,
  });
});

// @desc    Soft delete / anonymize user account
// @route   DELETE /api/users/account
// @access  Private
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Anonymize personal details to satisfy data deletion requests
  // while preserving relational integrity for Bookings/Reviews
  user.name = 'Deleted User';
  user.email = `deleted_${user._id}@homely.deleted`;
  user.phone = '';
  
  // Detach Google OAuth linkage
  if (user.googleId) {
    user.googleId = undefined;
  }

  // Optionally clean avatar
  if (user.avatar && user.avatar.publicId) {
    try {
      await deleteFromCloudinary(user.avatar.publicId);
    } catch (err) {
      console.error('Failed to clear avatar during account deletion', err);
    }
    user.avatar = { url: '', publicId: '' };
  }

  user.isVerified = false;
  // If your User schema has an isActive flag, toggle it:
  // user.isActive = false; 

  await user.save({ validateBeforeSave: false });

  // Disconnect the cookie session immediately
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Account successfully anonymized and deleted',
  });
});

// @desc    Upgrade user to host role
// @route   PUT /api/users/become-host
// @access  Private
export const becomeHost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role === 'host' || user.role === 'admin') {
    res.status(400);
    throw new Error(`User is already a ${user.role}`);
  }

  user.role = 'host';
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});
