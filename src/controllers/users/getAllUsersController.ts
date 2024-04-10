import { Request, Response } from "express";
import { User } from "../../models";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send("Error retrieving users");
    }
  };