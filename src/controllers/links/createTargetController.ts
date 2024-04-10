import { Request, Response } from "express";
import { User, Target } from "../../models/index";

export const createTarget = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const linkID = req.params.linkId;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send("User was not found");
    }
    const link = user.linkCollections.find(
      (linkGroup) => linkGroup._id.toString() === linkID
    );
    if (!link) {
      return res.status(404).send("Link was not found");
    }
    const { url } = req.body;

    const newTarget = new Target({
      url: url,
    });
    link.targets.push(newTarget);
    await user.save();

    res.status(200).send("Target was created successfully");
  } catch (error) {
    console.error("Error creating target:", error);
    res.status(500).send("Error creating target");
  }
};
