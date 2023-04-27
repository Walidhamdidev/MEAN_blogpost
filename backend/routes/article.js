import express from "express";

import article from "../controllers/article.js";
import fileUploadMiddleware from "../middleware/upload.js";

const router = express.Router();

router.get("/:id", article.getOne);
router.get("/", article.getAll);
router.post("/", fileUploadMiddleware(), article.addArticle);
router.delete("/:id", article.deleteArticle);
router.put("/:id", fileUploadMiddleware(), article.update);

export default router;
