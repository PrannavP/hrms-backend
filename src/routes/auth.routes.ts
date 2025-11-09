import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validation/auth.schema";

const router = Router();

// POST register route which has validation with register schema middleware and the actual register function after middleware
router.post("/register", validate(registerSchema), register);


// POST login route which has validation with login schema middleware and the actual login function after middleware
router.post("/login", validate(loginSchema), login);

export default router;