import { Request, Response } from "express";
import { User } from "../../models/index";

export const getUserLink = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const linkID = req.params.linkId;
      
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
    res.send(`${user.name}: ${link}`);
  } catch {
    res.status(500).send("Invalid ID");
  }
};
