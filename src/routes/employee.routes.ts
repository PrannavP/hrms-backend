// ALL EMPLOYEE RELATED ROUTES HERE
// ADMIN ROUTES ASWELL AS EMPLOYEE ROUTES

// Validation schemas
import { onBoardNewEmployeeSchema } from "../validation/employee.schema";
// Zod validation middleware
import { validate } from "../middlewares/validate";

import { Router } from "express";
import { authMiddleware, authorize } from "../middlewares/auth.middleware";
import { onBoardNewEmployee } from "../controllers/employee.controller";

const router = Router();

// Protected route aswell as only admin access routes
router.post('/onboardNewEmployee', validate(onBoardNewEmployeeSchema), authMiddleware, authorize(["admin"]), onBoardNewEmployee);

export default router;