import { Request, Response, NextFunction } from "express";
import * as userService from "../../services/user/user.service";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responses";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userService.getAllUsers(res);
    sendSuccessResponse(res, users);
  } catch (e) {
    next(e);
  }
}

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, password } = req.body;
    const createdUser = await userService.createNewUser(name, password);
    sendSuccessResponse(res, createdUser);
  } catch (e) {
    next(e);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId, res);
    sendSuccessResponse(res, user);
  } catch (e) {
    next(e);
  }
}

export async function updateUserById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId;
    const { name, password } = req.body;
    await userService.updateUserById(userId, name, password, res);
    sendSuccessResponse(res, "User got updated ");
  } catch (e) {
    next(e);
  }
}

export async function deleteUserbyId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId;
    await userService.deleteUserById(userId, res);
    sendSuccessResponse(res, `User deleted`);
  } catch (e) {
    next(e);
  }
}

export async function getLinksByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId;
    const links = await userService.getLinksByUserId(userId, res);
    sendSuccessResponse(res, links);
  } catch (e) {
    next(e);
  }
}
