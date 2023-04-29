import multer from "multer";
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
      if (req.files && req.files.length) req.body.image = req.files[0].path;
      next();
    },
  ];
};

export default fileUploadMiddleware;
