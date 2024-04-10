import { Request, Response } from "express";
import { User } from "../../models/index";


export const getUserAllLinks = async (req: Request, res: Response) => {
    try {
      const ID = req.params.userId;
      const user = await User.findById(ID);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(`${user.name}: links: ${user.linkCollections}`);
    } catch {
      res.status(500).send("Invalid ID");
    }
  };