import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validation/auth.schema";

const router = Router();

// POST register route which has validation with register schema middleware and the actual register function after middleware
router.post("/register", validate(registerSchema), register);


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login by email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Pass@123
 *     responses:
 *       200:
 *         description: Login as employee or admin
 */

// POST login route which has validation with login schema middleware and the actual login function after middleware
router.post("/login", validate(loginSchema), login);

export default router;