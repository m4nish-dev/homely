import { body } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
];

export const resetPasswordValidator = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const createPropertyValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').escape(),
  body('category')
    .isIn(['Hotels', 'Villas', 'Flats', 'Resorts', 'Cabins'])
    .withMessage('Invalid category'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .escape(),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value >= 0)
    .withMessage('Price must be at least 0'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .escape(),
];

export const createBookingValidator = [
  body('property').isMongoId().withMessage('Valid property ID is required'),
  body('checkIn')
    .isISO8601()
    .withMessage('Check-in must be a valid date')
    .custom((value) => {
      const checkInDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        throw new Error('Check-in date cannot be in the past');
      }
      return true;
    }),
  body('checkOut')
    .isISO8601()
    .withMessage('Check-out must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('Check-out date must be strictly after check-in date');
      }
      return true;
    }),
  body('guests.adults')
    .isInt({ min: 1 })
    .withMessage('At least 1 adult is required'),
];

export const createReviewValidator = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Comment must be at least 10 characters')
    .escape(),
];
