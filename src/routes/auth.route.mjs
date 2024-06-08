import { Router } from "express";
import passport from "passport";
import { matchedData, validationResult } from "express-validator";
import "../strategies/local-strategy.mjs";
import {
  authStatus,
  loginAuth,
  logoutAuth,
} from "../controllers/auth.controller.mjs";

const router = Router();

// We are using local but if we use google, facebook, discord etc
// pass those instead of local to passport.authenticate()
router.post("/api/auth", passport.authenticate("local"), loginAuth);

router.get("/api/auth/status", authStatus);

router.post("/api/auth/logout", logoutAuth);

export default router;
