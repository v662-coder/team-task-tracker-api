import { Request, Response } from "express";
import { analyticsService } from "../services/analytics.service";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const data = await analyticsService.getDashboardStats(user);

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};