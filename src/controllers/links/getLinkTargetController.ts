import { Request, Response } from "express";
import { User } from "../../models/index";

export const getLinkTarget = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const linkID = req.params.linkId;
    const targetID = req.params.targetID;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const link = user.linkCollections.find(
      (linkGroup) => linkGroup._id.toString() === linkID
    );
    if (!link) {
      return res.status(404).send("Link was not found");
    }
    
    const target = link.targets.find(
      (targets) => targets._id.toString === targetID
    );
    if (!target) {
      return res.status(404).send("Target was not found");
    }
    res.send(`${user.name}: ${target}`);
  } catch {
    res.status(500).send("Invalid ID");
  }
};
