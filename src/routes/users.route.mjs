import { Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  createUserValidation,
  filteredUserValidation,
} from "../validatorRules/user.rules.mjs";
import { users } from "../utils/mockUsers.mjs";
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
router.get("/api/users", filteredUserValidation, getAllUsers);

// Single user
router.get("/api/users/:id", getSingleUser);

// Create user
router.post("/api/users", createUserValidation, createUser);

// Update user
// Put
router.put("/api/users/:id", putUser);

// Patch
router.patch("/api/users/:id", patchUser);

// Delete user
router.delete("/api/users/:id", deleteUser);

export default router;
