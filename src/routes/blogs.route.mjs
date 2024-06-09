import { Router } from "express";
import { getBlogs } from "../controllers/blogs.controller.mjs";

const router = Router();

router.get("/api/blogs", getBlogs);

export default router;
