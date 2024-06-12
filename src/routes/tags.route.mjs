import { Router } from "express";

import { checkSchema } from "express-validator";
import ensureAuthenticated from "../middleware/authMiddleware.mjs";
import { getAllTags } from "../controllers/tags.controller.mjs";

const router = Router();

router.get("/api/tags", getAllTags);

export default router;
