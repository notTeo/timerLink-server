import { Request, Response } from "express";
import { User } from "../../models/index";

export const getUser = async (req: Request, res: Response, next) => {
    try {
      const ID = req.params.userId;
      const user = await User.findById(ID);
      next()
      res.send(user);
    } catch (e) {
      next(e)
      res.status(500).send("Invalid ID");
    }
  };
  