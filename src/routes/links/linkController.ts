import { Request, Response, NextFunction } from "express";
import { User, LinkGroup } from "../../models/index";
import * as linkService from "../../services/link/link.service";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responses";

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
    const link = await linkService.getLinkById(userId, linkId);
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
    await linkService.getLinkById(userId, linkId);
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
      targetBody
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

    // Call the service function to retrieve the target by link ID and target ID
    const target = await linkService.getTargetByLinkId(userId, linkId, targetId);

    sendSuccessResponse(res, target)
  } catch (e) {
    // Handle any errors and pass them to the error handling middleware
    next(e);
  }
}
