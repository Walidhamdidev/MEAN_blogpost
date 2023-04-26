import express from "express";

import article from "../controllers/article.js";

const router = express.Router();
// get one
router.get("/:id", article.getOne);
// get all
router.get("/", article.getAll);
// delete
router.delete("/:id", article.deleteArticle);
// update
router.put("/:id", article.update);

export default router;
