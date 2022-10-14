require("dotenv").config();
const path = require("path");
const multer = require("multer");

// const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const UPLOAD_DIR = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limit: { fileSize: process.env.FILE_MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = upload;
