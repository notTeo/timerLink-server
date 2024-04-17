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
}

export async function getLinkById(userId: string, linkId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User was not found");
  }
  const link = (await LinkGroup.findById(linkId));

  if (!link) {
    throw new Error("Link not found");
  }
  return link;
}

export async function deleteLinkById(userId: string, linkId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await LinkGroup.findByIdAndDelete(linkId);
  await user.save();
}

export async function createNewTarget(userId: string, linkId: string, targetBody: any) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const link = await LinkGroup.findById(linkId).populate("targets").exec();
    if (!link) {
      throw new Error("Link not found");
    }
    const newTarget = new Target({
      url: targetBody.url,
    });

    const savedTarget = await newTarget.save();

    link.targets.push(savedTarget);
    await link.save();
    return link;
  } catch (error) {
    console.error("Error creating new target:", error);
    throw error;
  }
}


export async function getTargetByLinkId(
  userId: string,
  linkId: string,
  targetId: string
) {
  const link = await LinkGroup.findById(linkId).populate("targets");
  const target = await Target.findById(targetId);

  if (!link) {
    throw new Error("Link not found");
  }

  return target;
}
