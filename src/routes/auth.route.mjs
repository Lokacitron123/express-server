import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.mjs";
import {
  authStatus,
  loginAuth,
  logoutAuth,
} from "../controllers/auth.controller.mjs";
import ensureAuthenticated from "../middleware/authMiddleware.mjs";

const router = Router();

// We are using local but if we use google, facebook, discord etc
// pass those instead of local to passport.authenticate()
router.post("/api/auth", passport.authenticate("local"), loginAuth);

router.get("/api/auth/status", ensureAuthenticated, authStatus);

router.post("/api/auth/logout", logoutAuth);

export default router;
