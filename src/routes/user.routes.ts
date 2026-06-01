import { Router } from "express";

import {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";

// (optional schemas)
import { registerSchema, loginSchema } from "../validations/user.validation";

const router = Router();


// 🟢 Public Routes (No auth required)

/**
 * Register new user
 */
router.post("/register", validate(registerSchema), registerUser);

/**
 * Login user
 */
router.post("/login", validate(loginSchema), loginUser);


// 🔒 Protected Routes
router.use(authMiddleware);


/**
 * 👤 Get logged-in user profile
 */
router.get("/me", getMe);


/**
 * 👥 Get all users (Admin / Org only)
 */
router.get("/", getUsers);


/**
 * ✏️ Update user by ID
 */
router.put("/:id", updateUser);


/**
 * ❌ Delete user by ID
 */
router.delete("/:id", deleteUser);


export default router;