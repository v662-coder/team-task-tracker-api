import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { IUser, UserRole } from "../models/User";
import Organization from "../models/Organization";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

export class AuthService {
  async register(data: any) {
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const organization =
      await Organization.create({
        name: data.organizationName,
      });

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    const user = (await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    organizationId: organization._id,
    })) as IUser;

    const payload = {
      userId: user._id,
      role: user.role,
      organizationId:
        user.organizationId,
    };

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    user.refreshToken = refreshToken;

    await user.save();

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = (await User.findOne({
    email,
    })) as IUser | null;

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      userId: user._id,
      role: user.role,
      organizationId:
        user.organizationId,
    };

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    user.refreshToken = refreshToken;

    await user.save();
    const safeUser = {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  organizationId: user.organizationId,
};

   return {
  user: safeUser,
  accessToken,
  refreshToken,
};
  }

  async refreshToken(token: string) {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    );

    const user = await User.findById(
      decoded.userId
    );

    if (
      !user ||
      user.refreshToken !== token
    ) {
      throw new Error("Invalid token");
    }

    const payload = {
      userId: user._id,
      role: user.role,
      organizationId:
        user.organizationId,
    };

    const accessToken =
      generateAccessToken(payload);

    const newRefreshToken =
      generateRefreshToken(payload);

    user.refreshToken =
      newRefreshToken;

    await user.save();

    return {
      accessToken,
      refreshToken:
        newRefreshToken,
    };
  }

  async logout(userId: string) {
    await User.findByIdAndUpdate(
      userId,
      {
        refreshToken: null,
      }
    );

    return true;
  }
}