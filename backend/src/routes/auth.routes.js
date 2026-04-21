import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { resgisterSchema, loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validate(resgisterSchema),register);
router.post("/login", validate(loginSchema), login);

export default router;