import Property from '../models/Property.js';
import asyncHandler from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../middleware/uploadMiddleware.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = asyncHandler(async (req, res, next) => {
  const {
    location,
    category,
    minPrice,
    maxPrice,
    guests,
    checkIn,
    checkOut,
    search,
    sortBy,
    page = 1,
    limit = 12,
  } = req.query;

  let query = { isActive: true };

  // 1. Text Search (using Mongoose text index)
  if (search) {
    query.$text = { $search: search };
  }

  // 2. Location Partial Match (regex)
  if (location) {
    query['location.city'] = { $regex: location, $options: 'i' };
  }

  // 3. Category Exact Match
  if (category && category !== 'All') {
    query.category = category;
  }

  // 4. Price Range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // 5. Guests
  if (guests) {
    query.maxGuests = { $gte: Number(guests) };
  }

  // 6. Availability Check (exclude properties that have overlapping booked dates)
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    query.bookedDates = {
      $not: {
        $elemMatch: {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      },
    };
  }

  // 7. Sorting Logic
  let sortObj = { rating: -1, createdAt: -1 }; // Recommended (default)
  if (sortBy === 'priceAsc') sortObj = { price: 1 };
  if (sortBy === 'priceDesc') sortObj = { price: -1 };
  if (sortBy === 'rating') sortObj = { rating: -1 };
  if (sortBy === 'newest') sortObj = { createdAt: -1 };

  // 8. Pagination Logic
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 12;
  const skip = (pageNum - 1) * limitNum;

  // Execute Query
  const properties = await Property.find(query)
    .sort(sortObj)
    .skip(skip)
    .limit(limitNum)
    .populate('host', 'name avatar');

  // Count total pages for pagination
  const total = await Property.countDocuments(query);
  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    success: true,
    count: properties.length,
    page: pageNum,
    totalPages,
    total,
    properties,
  });
});

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id)
    .populate('host', 'name avatar createdAt')
    .populate({
      path: 'reviews', // Populate the virtual "reviews" field
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    });

  if (!property || !property.isActive) {
    res.status(404);
    throw new Error('Property not found or is inactive');
  }

  res.status(200).json({
    success: true,
    property,
  });
});

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private (Host/Admin)
export const createProperty = asyncHandler(async (req, res, next) => {
  req.body.host = req.user._id;

  // Handle image uploads from multer memory buffer to Cloudinary
  if (req.files && req.files.length > 0) {
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, 'homely/properties');
      uploadedImages.push({
        url: result.url,
        publicId: result.publicId,
      });
    }
    req.body.images = uploadedImages;
  }

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    property,
  });
});

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
export const updateProperty = asyncHandler(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Ensure user is property owner or admin
  if (
    property.host.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('User not authorized to update this property');
  }

  let images = [...property.images];

  // Handle removed images: delete from Cloudinary and remove from DB array
  if (req.body.imagesToRemove) {
    let toRemove = req.body.imagesToRemove;
    if (!Array.isArray(toRemove)) toRemove = [toRemove]; // Ensure it's an array

    for (const publicId of toRemove) {
      if (publicId) {
        await deleteFromCloudinary(publicId);
        images = images.filter((img) => img.publicId !== publicId);
      }
    }
  }

  // Handle new image uploads appended to the property
  if (req.files && req.files.length > 0) {
    const newImages = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, 'homely/properties');
      newImages.push({
        url: result.url,
        publicId: result.publicId,
      });
    }
    images = [...images, ...newImages];
  }

  req.body.images = images;

  // Update document
  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    property,
  });
});

// @desc    Soft delete a property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
export const deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Ensure user is property owner or admin
  if (
    property.host.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('User not authorized to delete this property');
  }

  // Soft delete: prevents destroying past booking history records
  property.isActive = false;
  await property.save();

  res.status(200).json({
    success: true,
    message: 'Property successfully deleted',
  });
});

// @desc    Get top featured properties
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ isFeatured: true, isActive: true })
    .sort({ rating: -1 })
    .limit(8)
    .populate('host', 'name avatar');

  res.status(200).json({
    success: true,
    count: properties.length,
    properties,
  });
});

// @desc    Check availability for specific dates
// @route   POST /api/properties/:id/availability
// @access  Public
export const checkAvailability = asyncHandler(async (req, res, next) => {
  const { checkIn, checkOut } = req.body;
  const property = await Property.findById(req.params.id);

  if (!property || !property.isActive) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Uses the isAvailable instance method defined on the Property Schema
  const isAvailable = property.isAvailable(checkIn, checkOut);

  res.status(200).json({
    success: true,
    available: isAvailable,
  });
});

// @desc    Get properties owned by the logged in host
// @route   GET /api/properties/host/my-properties
// @access  Private (Host)
export const getMyProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ host: req.user._id }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: properties.length,
    properties,
  });
});