import { Request, Response } from "express";
import { User, LinkGroup } from "../../models/index";


export const createLink = async (req: Request, res: Response) => {
    try {
      const ID = req.params.userId;
      const user = await User.findById(ID);
      if (!user) {
        return res.status(404).send("User was not found");
      }
      const { linkName } = req.body;
  
      const newLink = new LinkGroup({
        linkName: linkName,
      });
      user.linkCollections.push(newLink);
      await user.save();
  
      res.status(200).send("Link was created successfully");
    } catch (error) {
      console.error("Error creating link:", error);
      res.status(500).send("Error creating link");
    }
  };
  