import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB globally for Vercel Serverless caching
connectDB();

// Only run app.listen if we are NOT in Vercel. 
// Vercel's serverless environment handles listening internally.
if (process.env.NODE_ENV !== "production") {
  const server = app.listen(PORT, () => {
    logger.info(`✓ Homely server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`, { stack: err.stack });
    server.close(() => process.exit(1));
  });
}

// CRITICAL FOR VERCEL: Export the Express app so Vercel can route requests to it
export default app;
