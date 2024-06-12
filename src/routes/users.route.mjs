import { Router } from "express";

import {
  createUserValidationSchema,
  filteredUserValidationSchema,
  updateProfileValidationSchema,
} from "../validatorSchemas/user.validation.mjs";
import { checkSchema } from "express-validator";
import ensureAuthenticated from "../middleware/authMiddleware.mjs";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  patchUser,
  putUser,
  putUserProfile,
} from "../controllers/users.controller.mjs";

const router = Router();
// Get
// All users
router.get(
  "/api/users",
  checkSchema(filteredUserValidationSchema),
  getAllUsers
);

// Single user
router.get("/api/users/:id", getSingleUser);

// Post
// Create user
router.post("/api/users", checkSchema(createUserValidationSchema), createUser);

// Put
// Update user
router.put("/api/users/:id", putUser);
// Update profile
router.put(
  "/api/users/profile/:id",
  ensureAuthenticated,
  checkSchema(updateProfileValidationSchema),
  putUserProfile
);

// Patch
router.patch("/api/users/:id", patchUser);

// Delete
// Delete user
router.delete("/api/users/:id", ensureAuthenticated, deleteUser);

export default router;
