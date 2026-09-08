import User from '../models/User.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get complete administrative dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res, next) => {
  // Total global counts
  const totalUsers = await User.countDocuments();
  const totalProperties = await Property.countDocuments();
  const totalBookings = await Booking.countDocuments();

  // Total Lifetime Revenue (sum of all paid bookings)
  const totalRevenueAggr = await Booking.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  const totalRevenue = totalRevenueAggr[0] ? totalRevenueAggr[0].total : 0;

  // Compute month-to-date baseline
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Stats for current month
  const bookingsThisMonth = await Booking.countDocuments({ createdAt: { $gte: startOfMonth } });

  const revenueThisMonthAggr = await Booking.aggregate([
    { $match: { paymentStatus: 'paid', createdAt: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  const revenueThisMonth = revenueThisMonthAggr[0] ? revenueThisMonthAggr[0].total : 0;

  // Breakdown of bookings by status (e.g., how many pending, confirmed, cancelled)
  const bookingsByStatus = await Booking.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  // Find Top 5 properties with the most bookings via aggregation pipeline
  const topPropertiesAggr = await Booking.aggregate([
    { $group: { _id: '$property', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'properties',
        localField: '_id',
        foreignField: '_id',
        as: 'propertyDetails'
      }
    },
    { $unwind: '$propertyDetails' },
    {
      $project: {
        _id: 1,
        count: 1,
        title: '$propertyDetails.title',
        location: '$propertyDetails.location',
        images: '$propertyDetails.images'
      }
    }
  ]);

  // Fetch 10 most recent chronological bookings
  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('user', 'name email avatar')
    .populate('property', 'title location images');

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalProperties,
      totalBookings,
      totalRevenue,
      bookingsThisMonth,
      revenueThisMonth,
      bookingsByStatus,
      topProperties: topPropertiesAggr,
      recentBookings
    }
  });
});

// @desc    Get all users with advanced search, filter, and pagination
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { search, role, page = 1, limit = 10 } = req.query;

  const query = {};

  if (role && role !== 'All') {
    query.role = role;
  }

  // Regex lookup across name and email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await User.countDocuments(query);
  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    success: true,
    count: users.length,
    page: pageNum,
    totalPages,
    total,
    users
  });
});

// @desc    Update a user's role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = asyncHandler(async (req, res, next) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Security constraint: Prevent an admin from altering their own role
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('You cannot modify your own administrative role from this endpoint');
  }

  user.role = role;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: `User role successfully updated to ${role}`,
    user
  });
});

// @desc    Soft delete a user (anonymize)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Security constraint: Prevent an admin from destroying their own account
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('You cannot delete your own account from the administrative dashboard');
  }

  // Anonymization protocol (preserves foreign keys on Bookings/Reviews)
  user.name = 'Deleted User';
  user.email = `deleted_${user._id}@homely.deleted`;
  user.phone = '';
  user.googleId = undefined;
  
  if (user.avatar && user.avatar.publicId) {
    user.avatar = { url: '', publicId: '' };
  }

  user.isVerified = false;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'User account successfully anonymized and soft-deleted',
  });
});

// @desc    Toggle property "isFeatured" badge
// @route   PUT /api/admin/properties/:id/feature
// @access  Private/Admin
export const toggleFeaturedProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  property.isFeatured = !property.isFeatured;
  await property.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: `Property isFeatured dynamically set to ${property.isFeatured}`,
    property
  });
});

// @desc    Toggle property "isActive" ban switch
// @route   PUT /api/admin/properties/:id/active
// @access  Private/Admin
export const toggleActiveProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  property.isActive = !property.isActive;
  await property.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: `Property isActive dynamically set to ${property.isActive}`,
    property
  });
});
