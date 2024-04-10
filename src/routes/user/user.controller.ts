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
      sendErrorResponse(res, "Somthing went wrong creating uset")
    }
    sendSuccessResponse(res, `User created`)
  } catch (e) {
    next(e);
  }
}

export function updateUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId
    const {name, password} = req.body
    const updateUser = userService.updateUserById(userId, name, password)
    if (!updateUser) {
      sendErrorResponse(res, "User didn't get updated")
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

export function getUserLinksById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    // const id = req.params.id;
    // const links = await linksService.getLinksByUserId(id);
    // sendSuccessResponse(res, links);
  } catch (e) {
    next(e);
  }
}