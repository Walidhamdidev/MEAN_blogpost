import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (path, filename) => {
  try {
    const result = await cloudinary.uploader.upload(filename, {
      upload_preset: path.split("/")[2],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const fileUploadMiddleware = (path) => {
  const storage = multer.diskStorage({
    destination: process.env.NODE_ENV === "production" ? null : path,
    filename: (req, file, callback) => {
      const filename = Date.now() + "." + file.mimetype.split("/")[1];
      req.body.image = filename;
      callback(null, filename);
    },
  });

  const upload = multer({ storage });
  return [
    upload.any("image"),
    (req, res, next) => {
      if (process.env.NODE_ENV === "production") {
        uploadToCloudinary(path, req.body.image);
      }
      next();
    },
  ];
};

export default fileUploadMiddleware;
