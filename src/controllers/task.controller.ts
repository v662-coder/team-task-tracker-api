import { Response } from "express";
import { taskService } from "../services/task.service";
import { AuthRequest } from "../types/request.types";

// CREATE TASK
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      organizationId: req.user!.organizationId,
    });

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// GET TASKS (FILTER + PAGINATION)
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const data = await taskService.getTasks(req.query, req.user!);
    return res.json(data);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// GET SINGLE TASK
export const getTask = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    return res.json(task);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE TASK
export const updateTask = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    return res.json(task);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    await taskService.deleteTask(req.params.id);
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE STATUS
export const updateStatus = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const task = await taskService.updateStatus(
      req.params.id,
      req.body.status,
      req.user!
    );

    return res.json(task);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};