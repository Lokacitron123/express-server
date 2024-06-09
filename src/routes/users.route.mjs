import { Router } from "express";

import {
  createUserValidationSchema,
  filteredUserValidationSchema,
} from "../validatorSchemas/user.validation.mjs";
import { checkSchema } from "express-validator";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  patchUser,
  putUser,
} from "../controllers/users.controller.mjs";

const router = Router();

// All users
router.get(
  "/api/users",
  checkSchema(filteredUserValidationSchema),
  getAllUsers
);

// Single user
router.get("/api/users/:id", getSingleUser);

// Create user
router.post("/api/users", checkSchema(createUserValidationSchema), createUser);

// Update user
// Put
router.put("/api/users/:id", putUser);

// Patch
router.patch("/api/users/:id", patchUser);

// Delete user
router.delete("/api/users/:id", deleteUser);

export default router;
