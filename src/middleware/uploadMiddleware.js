import fs from "fs";
import path from "path";
import multer from "multer";

const campaignUploadDir = path.join(process.cwd(), "uploads", "campaigns");

fs.mkdirSync(campaignUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, campaignUploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only PNG and JPG images are allowed"));
  }

  return cb(null, true);
};

export const uploadCampaignImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const handleUploadError = (err, req, res, next) => {
  if (!err) return next();

  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Campaign image cannot exceed 10MB" });
  }

  return res.status(400).json({ message: err.message || "Image upload failed" });
};
