import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions (sync) securely before app boots
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const start = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`✓ Homely server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Handle unhandled promise rejections (async)
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });

  // Graceful shutdown protocol for cloud load balancers / Kubernetes
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Closing gracefully...");
    server.close(() => process.exit(0));
  });
};

start();
