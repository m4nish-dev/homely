# Homely Production Deployment Checklist

### 1. Database Provisioning
- [ ] Deploy a MongoDB cluster on **MongoDB Atlas**.
- [ ] Ensure the cluster runs as a **Replica Set** (default on Atlas) to support Mongoose transactions during Bookings.
- [ ] Add your production server's IP (or allow all `0.0.0.0/0`) to the Atlas Network Access whitelist.

### 2. Environment Configurations
- [ ] Set `NODE_ENV=production`.
- [ ] Generate secure cryptographic strings for `JWT_SECRET`, `COOKIE_SECRET`, and `SESSION_SECRET`.
- [ ] Set `CLIENT_URL` to your live frontend domain (e.g., `https://homely.vercel.app`).

### 3. External API Integrations
- [ ] **Cloudinary**: Use production keys. Verify upload limits.
- [ ] **Razorpay**: Complete business KYC to activate **Live Mode**. Swap `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to Live keys.
- [ ] **Email/SMTP**: Use a production-grade SMTP service (SendGrid, AWS SES, Resend) instead of development proxies.

### 4. Hosting & Infrastructure
- [ ] **Backend Deployment**: Push to Render, Railway, or AWS Elastic Beanstalk. Ensure the build command is `npm install` and the start command is `npm run start`.
- [ ] **Frontend Deployment**: Push the React `client` folder to Vercel or Netlify. Verify `VITE_API_URL` points to the live backend domain.
- [ ] **SSL / Custom Domains**: Map custom domains to both services. Ensure traffic is forced over HTTPS. Let's Encrypt or Cloudflare are recommended.

### 5. Final Validations
- [ ] Test the live Google OAuth redirect URIs.
- [ ] Perform a live 1 INR transaction via Razorpay to test Webhooks and order verification.
