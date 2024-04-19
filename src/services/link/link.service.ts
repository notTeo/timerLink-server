import { User } from "../../models/index";
import { LinkGroup } from "../../models/linkGroupSchema";
import { Target } from "../../models/targetSchema";
import { Response } from "express";
import { sendErrorResponse } from "../../utils/responses";
import * as userService from "../user/user.service";

export async function createNewLink(
  userId: string,
  linkBody: any,
  res: Response
) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, "User was not found", 404);
    }
    const { linkName } = linkBody;

    const newLink = new LinkGroup({
      linkName: linkName,
    });
    await newLink.save();

    user.linkCollections.push(newLink);
    await user.save();
    return user;
  } catch (e) {
    console.log("Error creating new link", e);
    sendErrorResponse(res, "Error creating new link", 500);
  }
}

export async function getLinkById(
  userId: string,
  linkId: string,
  res: Response
) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, "User was not found", 404);
    }
    const link = (await LinkGroup.findById(linkId)).populate("targets");

    if (!link) {
      return sendErrorResponse(res, "Link not found", 404);
    }
    return link;
  } catch (e) {
    console.log("Error getting link", e);
    sendErrorResponse(res, "Error getting link", 500);
  }
}

export async function deleteLinkById(
  userId: string,
  linkId: string,
  res: Response
) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    const deletedLink = await LinkGroup.findByIdAndDelete(linkId);
    if (!deletedLink) {
      return sendErrorResponse(res, "Link not found", 404);
    }
    await user.save();
  } catch (e) {
    sendErrorResponse(res, "Error deleting link", 500);
  }
}

export async function createNewTarget(
  userId: string,
  linkId: string,
  targetBody: any,
  res: Response
) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    const link = await LinkGroup.findById(linkId).populate("targets").exec();
    if (!link) {
      return sendErrorResponse(res, "Link not found", 404);
    }
    const newTarget = new Target({
      url: targetBody.url,
    });

    const savedTarget = await newTarget.save();

    link.targets.push(savedTarget);
    await link.save();
    return link;
  } catch (e) {
    console.log("Error creating new target:", e);
    sendErrorResponse(res, "Error creating new target:", 500);
  }
}

export async function getTargetByLinkId(
  userId: string,
  linkId: string,
  targetId: string,
  res: Response
) {
  try {
    await getLinkById(userId, linkId, res);
    const target = await Target.findById(targetId);
    if (!target) {
      return sendErrorResponse(res, "Link not found", 404);
    }
    return target;
  } catch (e) {
    console.log("Error getting target:", e);
    sendErrorResponse(res, "Error getting target", 500);
  }
}

export async function deleteTargetById(
  userId: string,
  linkId: string,
  targetId: string,
  res: Response
) {
  try {
    const target = getTargetByLinkId(userId, linkId, targetId, res);
    if (!target) {
      return sendErrorResponse(res, "Target not found", 404);
    }
    await Target.findByIdAndDelete(targetId);
  } catch (e) {
    console.log("Error deleting target:", e);
    sendErrorResponse(res, "Error deleting target", 500);
  }
}

export async function updateTargetById(
  userId: string,
  linkId: string,
  targetId: string,
  targetBody: any,
  res: Response
) {
  try {
    const target = getTargetByLinkId(userId, linkId, targetId, res);
    if (!target) {
      return sendErrorResponse(res, "Target not found", 404);
    }
    const updatedTarget = await Target.findByIdAndUpdate(targetId, targetBody, {
      new: true,
    });
    await updatedTarget.save();
    return updatedTarget;
  } catch (e) {
    console.log("Error getting target:", e);
    sendErrorResponse(res, "Error getting target", 500);
  }
}
