import multer from "multer";

const fileUploadMiddleware = () => {
  return (req, res, next) => {
    const { title, description, content, tags, authorId } = req.body;
    if (!title || !description || !content || !tags || !authorId) {
      return next();
    }
    let filename = "";
    const storage = multer.diskStorage({
      destination: "./uploads/article",
      filename: (req, file, redirect) => {
        const fl = Date.now() + "." + file.mimetype.split("/")[1];
        filename = fl;
        redirect(null, fl);
      },
    });

    const upload = multer({ storage });
    return upload.any("image")(req, res, (err) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      }
      req.body.image = filename;
      return next();
    });
  };
};

export default fileUploadMiddleware;
