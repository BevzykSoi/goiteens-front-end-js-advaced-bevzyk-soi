const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
require("./config/db");
const path = require("path");
const multer = require("multer");
const fs = require("fs").promises;
const Jimp = require("jimp");
const cloudinary = require("cloudinary").v2;

const app = express();

const imagesPath = path.join(process.cwd(), "public/images");
const uploadsPath = path.join(process.cwd(), "public/uploads");
const staticFolderPath = path.join(process.cwd(), "public");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const newFileName = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFileName);
  },
});

const upload = multer({
  storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(express.static(staticFolderPath));
app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));

app.post("/upload", upload.single("image"), async (req, res) => {
  const uploadedImage = await Jimp.read(req.file.path);
  const editedImagePath = path.join(imagesPath, req.file.filename);
  await uploadedImage.resize(256, 256).quality(50).writeAsync(editedImagePath);
  await fs.unlink(req.file.path);

  const uploadResponse = await cloudinary.uploader.upload(editedImagePath);

  res.json(uploadResponse);
});

module.exports = app;
