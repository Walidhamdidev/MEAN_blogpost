import multer from "multer";

const fileUploadMiddleware = (path) => {
  const storage = multer.diskStorage({
    destination: path,
    filename: (req, file, redirect) => {
      const filename = Date.now() + "." + file.mimetype.split("/")[1];
      req.body.image = filename;
      redirect(null, filename);
    },
  });

  const upload = multer({ storage });
  return upload.any("image");
};

export default fileUploadMiddleware;
