import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

const authService =
  new AuthService();

export const register = async (
  req: Request,
  res: Response
) => {
  const result =
    await authService.register(
      req.body
    );

  res.status(201).json(result);
};

export const login = async (
  req: Request,
  res: Response
) => {
  const result =
    await authService.login(
      req.body.email,
      req.body.password
    );

  res.json(result);
};

export const refresh = async (
  req: Request,
  res: Response
) => {
  const result =
    await authService.refreshToken(
      req.body.refreshToken
    );

  res.json(result);
};

export const logout = async (
  req: Request,
  res: Response
) => {
  await authService.logout(
    req.body.userId
  );

  res.json({
    success: true,
  });
};