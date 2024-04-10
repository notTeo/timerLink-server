import { Request, Response } from "express";
import { User, LinkGroup, Target } from "../../models/index";

export const updateLinkTarget = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const linkID = req.params.linkId;
    const targetID = req.params.targetID;

    const {
      newUrl,
      newExpireDate,
      newStartDate,
    }: {
      newUrl?: string;
      newExpireDate?: Date;
      newStartDate?: Date;
    } = req.body;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const link = await LinkGroup.findById(linkID);

    if (!link) {
      return res.status(404).send("Link was not found");
    }
    const target = await Target.findByIdAndUpdate(
      targetID,
      {
        url: newUrl,
        expireDate: newExpireDate,
        startDate: newStartDate,
      },
      { new: true }
    );
    if (!target) {
      return res.status(404).send("Target was not found");
    }
    res.send("Target was updated");
  } catch {
    res.status(500).send("Invalid ID");
  }
};
