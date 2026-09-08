import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    checkIn: {
      type: Date,
      required: [true, 'Please provide a check-in date'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Please provide a check-out date'],
    },
    guests: {
      adults: {
        type: Number,
        required: true,
        min: [1, 'At least 1 adult is required'],
      },
      children: {
        type: Number,
        default: 0,
      },
    },
    nights: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      default: 499,
    },
    taxes: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    guestDetails: {
      name: {
        type: String,
        required: [true, 'Guest name is required'],
      },
      email: {
        type: String,
        required: [true, 'Guest email is required'],
      },
      phone: String,
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
    },
    cancellationReason: String,
    cancelledAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster lookups
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ property: 1, checkIn: 1, checkOut: 1 });

// Pre-validate hook to calculate required fields before Mongoose validation occurs
bookingSchema.pre('validate', function (next) {
  // 1. Validate Dates
  if (this.checkIn && this.checkOut) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Strip time for exact date comparison
    
    const checkInDate = new Date(this.checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      this.invalidate('checkIn', 'Check-in date cannot be in the past');
    }
    
    if (new Date(this.checkOut) <= new Date(this.checkIn)) {
      this.invalidate('checkOut', 'Check-out date must be strictly after check-in date');
    }

    // 2. Auto-calculate nights
    const diffTime = Math.abs(new Date(this.checkOut) - new Date(this.checkIn));
    this.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // 3. Auto-calculate prices
  if (this.pricePerNight && this.nights) {
    this.subtotal = this.pricePerNight * this.nights;
    this.totalAmount = this.subtotal + (this.serviceFee || 499) + (this.taxes || 0);
  }

  // 4. Generate unique Booking ID (HM + 6 random digits)
  if (this.isNew && !this.bookingId) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    this.bookingId = `HM${randomDigits}`;
  }

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;