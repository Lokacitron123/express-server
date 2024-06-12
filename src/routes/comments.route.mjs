import { Router } from "express";

import { checkSchema } from "express-validator";
import ensureAuthenticated from "../middleware/authMiddleware.mjs";
import {
  createComment,
  deleteComment,
} from "../controllers/comments.controller.mjs";
import { createCommentValidationSchema } from "../validatorSchemas/comment.validation.mjs";

const router = Router();

router.post(
  "/api/comments/:id",
  ensureAuthenticated,
  checkSchema(createCommentValidationSchema),
  createComment
);

router.delete("/api/comments/:id", ensureAuthenticated, deleteComment);

export default router;
