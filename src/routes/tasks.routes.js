import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", authRequire, getTasks);
router.get("/tasks/:id", authRequire, getTask);
router.post("/tasks", authRequire, createTask);
router.put("/tasks/:id", authRequire, updateTask);
router.delete("/tasks/:id", authRequire, deleteTask);

export default router;
