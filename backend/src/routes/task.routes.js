import express  from "express";
import * as ctrl from "../controllers/task.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation.js";


const router = express.Router();

router.use(protect);

router.get("/", ctrl.getAll);
router.post("/", validate(createTaskSchema), ctrl.create);
router.put("/:id", validate(updateTaskSchema), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;