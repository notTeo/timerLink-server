import { Request, Response } from "express";
import { User, LinkGroup, Target } from "../../models/index";

export const deleteLinkTarget = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const linkID = req.params.linkId;
    const targetID = req.params.targetId;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).send(`didnt find user`);
    }

    const link = await LinkGroup.findById(linkID);

    if (!link) {
      return res.status(404).send("Link was not found");
    }
    const target = await Target.findByIdAndDelete(targetID);
    if (!target) {
      return res.status(404).send("Target was not found");
    }
    res.status(200).send("Target deleted successfully");
  } catch (error) {
    console.error("Error deleting target:", error);
    res.status(500).send("Error deleting target");
  }
};
