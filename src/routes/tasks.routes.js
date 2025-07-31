import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
} from "../controllers/tasks.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequire, getTasks);
router.get("/tasks/:id", authRequire, getTask);
router.post(
	"/tasks",
	authRequire,
	validateSchema(createTaskSchema),
	createTask,
);
router.put("/tasks/:id", authRequire, updateTask);
router.delete("/tasks/:id", authRequire, deleteTask);

export default router;
