import { Request, Response, NextFunction } from "express";
import * as linkService from "../../services/link/link.service";
import { sendSuccessResponse } from "../../utils/responses";

export async function createNewLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkBody = req.body;
    const newLink = await linkService.createNewLink(userId, linkBody, res);
    sendSuccessResponse(res, newLink);
  } catch (e) {
    next(e);
  }
}

export async function getLinkById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkId = req.params.linkId;
    const link = await linkService.getLinkById(userId, linkId, res);
    sendSuccessResponse(res, link);
  } catch (e) {
    next(e);
  }
}

export async function deleteLinkById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkId = req.params.linkId;
    await linkService.deleteLinkById(userId, linkId, res);
    sendSuccessResponse(res, "link deleted");
  } catch (e) {
    next(e);
  }
}

export async function createNewTarget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkId = req.params.linkId;
    const targetBody = req.body;
    const newTarget = await linkService.createNewTarget(
      userId,
      linkId,
      targetBody,
      res
    );
    sendSuccessResponse(res, newTarget);
  } catch (e) {
    next(e);
  }
}

export async function getTargetByLinkId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkId = req.params.linkId;
    const targetId = req.params.targetId;
    const target = await linkService.getTargetByLinkId(userId, linkId, targetId, res);
    sendSuccessResponse(res, target)
  } catch (e) {
    next(e);
  }
}

export async function deleteTargetById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkId = req.params.linkId;
    const targetId = req.params.targetId;
    await linkService.deleteTargetById(userId, linkId, targetId, res);
    sendSuccessResponse(res, "target deleted");
  } catch (e) {
    next(e);
  }
}

export async function updateTargetById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const linkId = req.params.linkId;
    const targetId = req.params.targetId;
    const targetBody = req.body;
    const updatedTarget = await linkService.updateTargetById(
      userId,
      linkId,
      targetId,
      targetBody,
      res
    );
    sendSuccessResponse(res, updatedTarget);
  } catch (e) {
    next(e);
  }
}