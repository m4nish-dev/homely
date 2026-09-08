import crypto from 'crypto';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendTokenResponse, generateToken } from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // (Optional) Send welcome email here
  // await sendEmail(...) 

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for user and explicitly request password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Force users to use Google if they signed up that way
  if (user.authProvider !== 'local') {
    res.status(400);
    throw new Error('Use Google login for this account');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Update lastLogin timestamp
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Public
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  // Populate favorites with essential property data for the UI
  const user = await User.findById(req.user.id).populate(
    'favorites',
    'title location price image images category rating reviewCount'
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error('There is no user with that email');
  }

  // Get reset token (this generates it and sets the hashed version on the user model)
  const resetToken = user.getResetPasswordToken();

  // Save the hashed token to the database
  await user.save({ validateBeforeSave: false });

  // Create reset url matching the frontend route
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) requested a password reset. Please click this link to reset: \n\n ${resetUrl}`;

  try {
    // Send email using the utility
    await sendEmail({
      email: user.email,
      subject: 'Homely Password Reset',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    // If email fails, clear the tokens from the DB to prevent dangling tokens
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error('Email could not be sent');
  }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Hash token from URL so it matches the DB hashed version
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Ensure it hasn't expired
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  // Set new password (the pre-save hook will automatically hash this)
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Log them in immediately after reset
  sendTokenResponse(user, 200, res);
});

// @desc    Update password (when logged in)
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    res.status(401);
    throw new Error('Password is incorrect');
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Google OAuth Callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = asyncHandler(async (req, res, next) => {
  // Passport automatically attaches the user to req.user after success
  const user = req.user;
  
  if (!user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
  }
  
  // Generate token 
  const token = generateToken(user._id, user.role);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'lax',
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Set cookie and redirect (don't return JSON since it's a browser redirect flow)
  res.cookie('token', token, options);
  res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
});