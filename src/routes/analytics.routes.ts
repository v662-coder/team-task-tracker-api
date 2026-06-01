import { Router } from "express";
import {
  getDashboardStats,
  getTaskStatusBreakdown,
  getTaskPriorityBreakdown,
  getOrgOverview,
} from "../controllers/analytics.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// 🔒 All analytics routes should be protected
router.use(authMiddleware);

/**
 * 📊 Dashboard main stats
 */
router.get("/dashboard", getDashboardStats);

/**
 * 📈 Tasks by status (TODO, DONE, etc.)
 */
router.get("/tasks/status", getTaskStatusBreakdown);

/**
 * 📉 Tasks by priority (LOW, MEDIUM, HIGH)
 */
router.get("/tasks/priority", getTaskPriorityBreakdown);

/**
 * 🏢 Organization overview
 */
router.get("/organization", getOrgOverview);

export default router;