import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';

// Configure multer to use Memory Storage instead of Disk Storage
// This ensures server disks don't fill up with temporary files
const storage = multer.memoryStorage();

// Validate file types to only accept safe image formats
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Unsupported file format. Only JPEG, JPG, PNG, and WebP are allowed.'),
      false
    );
  }
};

// Export the multer middleware instance
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 10,                 // Max 10 files per upload batch
  },
  fileFilter,
});

// Helper function to stream a buffer directly to Cloudinary
export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );

    // Convert memory buffer to readable stream and pipe to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Helper function to safely delete an asset from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
  }
};
