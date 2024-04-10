import { Request, Response } from "express";
import { User, LinkGroup } from "../../models/index";

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const linkID = req.params.linkId;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send(`didnt find user`);
    }

    const deletedLink = await LinkGroup.findByIdAndDelete(linkID);
    if (!deletedLink) {
      return res.status(404).send("Link was not found");
    }
    res.status(200).send("Link deleted successfully");  
    
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).send("Error deleting link");
  }
};
