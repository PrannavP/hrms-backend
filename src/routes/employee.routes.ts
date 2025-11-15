// ALL EMPLOYEE RELATED ROUTES HERE
// ADMIN ROUTES ASWELL AS EMPLOYEE ROUTES

// Validation schemas
import {
    onBoardNewEmployeeSchema,
    updateEmployeeSchema
} from "../validation/employee.schema";

// Zod validation middleware
import { validate } from "../middlewares/validate";

import { Router } from "express";
import { authMiddleware, authorize } from "../middlewares/auth.middleware";
import {
    onBoardNewEmployee,
    editEmployeeDetails,
    getEmployeeDetails,
    fetchAllEmployeeDetails
} from "../controllers/employee.controller";

const router = Router();

// Protected route aswell as only admin access routes
router.post('/onboardNewEmployee', validate(onBoardNewEmployeeSchema), authMiddleware, authorize(["admin"]), onBoardNewEmployee);

// Use the same validation for employee create
router.post('/updateEmployee', validate(updateEmployeeSchema), authMiddleware, authorize(["admin"]), editEmployeeDetails);

// get employee data endpoint for admin
router.get("/getEmployee", authMiddleware, authorize(["admin"]), getEmployeeDetails);

// get all employees in list for amdin
router.get("/employeeList", authMiddleware, authorize(["admin"]), fetchAllEmployeeDetails);

export default router;