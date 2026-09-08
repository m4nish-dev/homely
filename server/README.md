# Homely Backend API

The Node.js/Express backend powering the Homely property booking platform.

## Features
- **Authentication**: JWT-based auth with Google OAuth integration.
- **Payment Processing**: Razorpay Webhook integration with signature verification.
- **Transactions**: MongoDB replica-set native multi-document transactions for booking concurrency.
- **Documentation**: Interactive OpenAPI 3.0 specs via Swagger UI.

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file in the root based on the variables listed below.

3. **Start MongoDB Daemon:**
   Ensure your local MongoDB instance is running (as a replica set for transactions).
   ```bash
   brew services start mongodb-community
   ```

4. **Seed Database (Optional):**
   ```bash
   npm run seed
   ```

5. **Run the Server:**
   ```bash
   npm run dev    # Development mode (nodemon)
   npm run start  # Production mode
   ```

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | The port the server runs on (e.g. 5000) |
| `NODE_ENV` | `development` or `production` |
| `MONGO_URI` | Connection string for MongoDB Replica Set |
| `CLIENT_URL` | Frontend URL (e.g. `http://localhost:5173`) |
| `JWT_SECRET` | Secret key for signing auth tokens |
| `COOKIE_SECRET` | Secret key for signing secure cookies |
| `SESSION_SECRET` | Secret for `express-session` (OAuth) |
| `RAZORPAY_KEY_ID` | Your Razorpay API Key |
| `RAZORPAY_KEY_SECRET` | Your Razorpay API Secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary credentials |
| `CLOUDINARY_API_KEY` | Cloudinary credentials |
| `CLOUDINARY_API_SECRET` | Cloudinary credentials |
| `SMTP_HOST` | Nodemailer SMTP config |
| `SMTP_PORT` | Nodemailer SMTP config |
| `SMTP_USER` | Nodemailer SMTP config |
| `SMTP_PASS` | Nodemailer SMTP config |

## Core API Endpoints
*Full interactive documentation available at `/api-docs` when the server is running.*

- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Properties**: `/api/properties`
- **Bookings**: `/api/bookings`
- **Payments**: `/api/payments/create-order`, `/api/payments/verify`, `/api/payments/webhook`
