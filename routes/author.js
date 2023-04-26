import express from "express";

import author from "../controllers/author.js";

const router = express.Router();
router.post("/signIn", author.login);
router.post("/signUp", author.register);

export default router;
