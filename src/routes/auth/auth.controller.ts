import { Request, Response, NextFunction } from "express";
import * as authService from "../../services/auth/auth.service";
import { sendSuccessResponse } from "../../utils/responses";
import { IUserPayload } from "../../models";

export async function login(
  req: Request<unknown, unknown, { username?: string; password?: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    sendSuccessResponse(res, { token });
  } catch (e) {
    next(e);
  }
}

export async function register(
  req: Request<
    unknown,
    unknown,
    Partial<IUserPayload> & { confirmPassword?: string }
  >,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, password, confirmPassword, ...userPayload } = req.body;
    if (!confirmPassword || password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const user = await authService.register(username, password, userPayload);
    sendSuccessResponse(res, { user });
  } catch (e) {
    next(e);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}

export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}

export async function verifyOTP(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}
