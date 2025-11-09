import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/user.controller";

const router = Router();

// Protected route which calls the authMiddleware which validates the jwtToken and allows to hit getProfile if valid else returns error
router.get("/profile", authMiddleware, getProfile);

export default router;