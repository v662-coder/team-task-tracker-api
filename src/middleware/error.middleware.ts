import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,

    code: err.code || "INTERNAL_ERROR",

    message:
      err.message || "Something went wrong",
  });
};