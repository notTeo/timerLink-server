import { Request, Response } from "express";
import { User } from "../../models/index";

export const deleteUser = async (req: Request, res: Response) => {
    try {
      const userID = req.params.userid;
      const deletedUser = await User.findByIdAndDelete(userID);
      if (deleteUser) {
        res.status(200).send(`User ${deletedUser.name} deleted successfully`);
      } else {
        res.status(404).send("User was not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user");
    }
  };