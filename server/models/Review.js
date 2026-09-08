import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
      index: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Please add a comment'],
      trim: true,
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent a user from submitting more than one review per property
reviewSchema.index({ user: 1, property: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.calculateAverageRating = async function (propertyId) {
  const obj = await this.aggregate([
    {
      $match: { property: propertyId },
    },
    {
      $group: {
        _id: '$property',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  try {
    if (obj.length > 0) {
      // Round to 1 decimal place (e.g., 4.56 -> 4.6)
      const roundedRating = Math.round(obj[0].averageRating * 10) / 10;
      await mongoose.model('Property').findByIdAndUpdate(propertyId, {
        rating: roundedRating,
        reviewCount: obj[0].reviewCount,
      });
    } else {
      // No reviews left
      await mongoose.model('Property').findByIdAndUpdate(propertyId, {
        rating: 0,
        reviewCount: 0,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.property);
});

// Call getAverageCost after remove (document deletion)
reviewSchema.post('deleteOne', { document: true, query: false }, async function () {
  await this.constructor.calculateAverageRating(this.property);
});

// Call getAverageCost after findOneAndDelete
reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.property);
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;