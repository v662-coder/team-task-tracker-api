import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { AuthRequest } from "../types/request.types";

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body);

    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// GET PROFILE (logged-in user)
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user!.id);

    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// GET ALL USERS (ORG / ADMIN)
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await userService.getUsers(req.user!);

    return res.json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE PROFILE
export const updateUser = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    await userService.deleteUser(req.params.id);

    return res.json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};