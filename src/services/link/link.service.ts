import { User } from "../../models/index";
import { LinkGroup } from "../../models/linkGroupSchema";
import { Target } from "../../models/targetSchema";
import { Response } from "express";
import { sendErrorResponse } from "../../utils/responses";

export async function createNewLink(userId: string, name: any) {
  const user = await User.findById(userId);
  const linkName = name;

  const newLink = new LinkGroup({
    name: linkName,
  });
  await newLink.save();

  user.links.push(newLink);
  await user.save();
  return user;
}

export async function getLinksByUserId(userId: string) {
  const user = await User.findById(userId).populate("links");
  return user.links;
}

export async function getLinkById(userId: string, linkId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User was not found");
  }
  const link = await LinkGroup.findById(linkId).populate("targets");

  if (!link) {
    throw new Error("Link was not found");
  }
  return link;
}

export async function deleteLinkById(userId: string, linkId: string) {
  const user = await User.findById(userId);
  const deletedLink = await LinkGroup.findByIdAndDelete(linkId);
  if (!deletedLink) {
    throw new Error("Link not found");
  }
  await user.save();
}

export async function createNewTarget(
  userId: string,
  linkId: string,
  url: string
) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User was not found");
  }

  const link = await LinkGroup.findById(linkId).populate("targets");
  if (!link) {
    throw new Error("Link was not found");
  }

  const newTarget = new Target({
    url: url,
  });

  const savedTarget = await newTarget.save();
  link.targets.push(savedTarget);
  await link.save();

  return link;
}

export async function getTargetById(
  userId: string,
  linkId: string,
  targetId: string
) {
  await getLinkById(userId, linkId);
  const target = await Target.findById(targetId);
  if (!target) {
    throw new Error("Link not found");
  }
  return target;
}

export async function deleteTargetById(
  userId: string,
  linkId: string,
  targetId: string
) {
  const target = await getTargetById(userId, linkId, targetId);
  if (!target) {
    throw new Error("Target not found");
  }
  await Target.findByIdAndDelete(targetId);
}

export async function updateTargetById(
  userId: string,
  linkId: string,
  targetId: string,
  targetBody: any,
  res: Response
) {
  try {
    const target = getTargetById(userId, linkId, targetId);
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
