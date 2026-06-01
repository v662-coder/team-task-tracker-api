import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        code: "UNAUTHORIZED",
        message: "Token missing",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as any;

    
    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({
      status: 401,
      code: "INVALID_TOKEN",
      message: "Invalid token",
    });
  }
};