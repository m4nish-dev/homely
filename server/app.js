import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import passport from 'passport';
import rateLimit from 'express-rate-limit';

// Load env vars first
dotenv.config();

// Import passport config
import './config/passport.js';

// Import all route files and errorMiddleware
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Swagger OpenAPI
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Sanitize CLIENT_URL to prevent CORS failures due to trailing slashes
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : '';

// CORS — allow CLIENT_URL with credentials
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', clientUrl],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);

// Global rate limit — 100 requests per 15 min per IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Razorpay webhook FIRST with raw body (BEFORE express.json)
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());

// Health check
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', uptime: process.uptime() })
);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Mount Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 and error handler LAST
app.use(notFound);
app.use(errorHandler);

export default app;
