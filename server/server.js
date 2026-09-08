import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions (sync) securely before app boots
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

const start = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    logger.info(`✓ Homely server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Handle unhandled promise rejections (async)
  process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`, { stack: err.stack });
    server.close(() => process.exit(1));
  });

  // Graceful shutdown protocol for cloud load balancers / Kubernetes
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Closing gracefully...");
    server.close(() => process.exit(0));
  });
};

start();
