import { Router } from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/task.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";

// (optional) schemas
import { createTaskSchema } from "../validations/task.validation";

const router = Router();


// 🔒 Protect all task routes
router.use(authMiddleware);


/**
 * 🟢 Create Task
 */
router.post("/", validate(createTaskSchema), createTask);


/**
 * 🔵 Get all tasks (filters + pagination)
 */
router.get("/", getTasks);


/**
 * 🟡 Get single task by ID
 */
router.get("/:id", getTask);


/**
 * 🟠 Update task completely
 */
router.put("/:id", updateTask);


/**
 * 🔴 Delete task
 */
router.delete("/:id", deleteTask);


/**
 * ⚡ Update only status (Kanban drag-drop use case)
 */
router.patch("/:id/status", updateStatus);


export default router;