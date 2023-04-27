import express from "express";

import author from "../controllers/author.js";
import fileUploadMiddleware from "../middleware/upload.js";

const router = express.Router();
router.post("/signIn", author.login);
router.post(
  "/signUp",
  fileUploadMiddleware("./uploads/author"),
  author.register
);
router.get("/:id", author.getOne);
router.get("/", author.getAll);
router.put(
  "/:id",
  fileUploadMiddleware("./uploads/author"),
  author.updateAuthor
);
router.delete("/:id", author.deleteAuthor);

export default router;
