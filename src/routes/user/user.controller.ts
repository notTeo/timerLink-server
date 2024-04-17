import { Request, Response, NextFunction } from "express";
import * as userService from "../../services/user/user.service";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responses";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      sendErrorResponse(res, "Something went wrong fetching users from database")
    }
    sendSuccessResponse(res, users);
  } catch (e) {
    next(e);
  }
}

export async function createNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const {name , password}  = req.body;
    const createdUser = await userService.createNewUser(name, password);
    sendSuccessResponse(res, createdUser)
  } catch (e) {
    next(e);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId
    const user = await userService.getUserById(userId)
    if (!user) {
      sendErrorResponse(res, "user not found", 404)
    }
    sendSuccessResponse(res, user)
  } catch (e) {
    next(e);
  }
}

export async function updateUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId
    const {name, password} = req.body
    const updateUser = await userService.updateUserById(userId, name, password)
    if (!updateUser) {
      sendErrorResponse(res, "User didn't get updated")
      return;
    }
    sendSuccessResponse(res, "User got updated ")
  } catch (e) {
    next(e);
  }
}

export async function deleteUserbyId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId
    const deletedUser = await userService.deleteUserById(userId)
    if (!deletedUser) {
      sendErrorResponse(res, "User didn't get deleted")
    }
    sendSuccessResponse(res, `User deleted`)
  } catch (e) {
    next(e);
  }
}

export async function getLinksByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const links = await userService.getLinksByUserId(userId);
    sendSuccessResponse(res, links);
  } catch (e) {
    next(e);
  }
}
