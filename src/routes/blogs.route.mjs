import { Router } from "express";
import {
  createBlog,
  deletePostById,
  editBlog,
  editBlogContent,
  getBlogs,
} from "../controllers/blogs.controller.mjs";
import {
  createBlogValidationSchema,
  editBlogContentValidationSchema,
  editBlogValidationSchema,
} from "../validatorSchemas/blog.validation.mjs";
import { checkSchema } from "express-validator";
import ensureAuthenticated from "../middleware/authMiddleware.mjs";

const router = Router();

router.get("/api/blogs", getBlogs);

router.post(
  "/api/blogs",
  ensureAuthenticated,
  checkSchema(createBlogValidationSchema),
  createBlog
);

router.patch(
  "/api/blogs/post/:id",
  ensureAuthenticated,
  checkSchema(editBlogContentValidationSchema),
  editBlogContent
);

router.patch(
  "/api/blogs/post/edit/:id",
  ensureAuthenticated,
  checkSchema(editBlogValidationSchema),
  editBlog
);

router.delete("/api/blogs/post/:id", ensureAuthenticated, deletePostById);

export default router;
