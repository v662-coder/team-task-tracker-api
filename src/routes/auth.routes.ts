import { Router } from "express";

import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller";
import {
  authenticate,
} from "../middleware/auth.middleware";

import {
  authorize,
} from "../middleware/role.middleware";

const router = Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/refresh",
  refresh
);

router.post(
  "/logout",
  authenticate,
  logout
);
router.get(
  "/admin-only",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    const user = (req as any).user;

    res.json({
      success: true,
      role: user?.role,
    });
  }
);

export default router;