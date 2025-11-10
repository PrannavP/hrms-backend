import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { getMenu } from "../controllers/menu.controller";

const router = Router();

// Protected route for menu
router.get("/getMenu", authMiddleware, getMenu);

export default router;