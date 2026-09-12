import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a property title'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      enum: ['Hotels', 'Villas', 'Flats', 'Resorts', 'Cabins'],
      required: [true, 'Please select a category'],
      index: true,
    },
    location: {
      city: {
        type: String,
        required: [true, 'Please add a city'],
        index: true,
      },
      country: {
        type: String,
        default: 'India',
      },
      address: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price per night'],
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'INR',
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          publicId: { type: String, required: false },
        },
      ],
      validate: [v => v.length > 0, 'You must provide at least one image'],
    },
    amenities: [String],
    highlights: [
      {
        icon: String,
        label: String,
      },
    ],
    nearbyAreas: [
      {
        name: String,
        distance: String,
      },
    ],
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    maxGuests: {
      type: Number,
      default: 2,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    isNewlyListed: {
      // Named 'isNewlyListed' because 'isNew' is a reserved property in Mongoose Documents
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    bookedDates: [
      {
        checkIn: Date,
        checkOut: Date,
        bookingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Booking',
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound and Text Indexes for Search & Filter Optimization
propertySchema.index({ category: 1, 'location.city': 1, price: 1 });
propertySchema.index({ title: 'text', description: 'text', 'location.city': 'text' });

// Virtual Population for Reviews
propertySchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'property',
  justOne: false,
});

// Pre-save hook to generate unique slug
propertySchema.pre('save', function () {
  if (this.isModified('title')) {
    const baseSlug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const shortId = uuidv4().split('-')[0]; // Use short UUID to ensure uniqueness
    this.slug = `${baseSlug}-${shortId}`;
  }
});

// Instance method to check date availability
propertySchema.methods.isAvailable = function (reqCheckIn, reqCheckOut) {
  const checkIn = new Date(reqCheckIn);
  const checkOut = new Date(reqCheckOut);

  // Overlap occurs if requested checkIn is before an existing checkOut 
  // AND requested checkOut is after the existing checkIn
  const hasOverlap = this.bookedDates.some((booking) => {
    return checkIn < booking.checkOut && checkOut > booking.checkIn;
  });

  return !hasOverlap; // Returns true if no overlap
};

const Property = mongoose.model('Property', propertySchema);

export default Property;