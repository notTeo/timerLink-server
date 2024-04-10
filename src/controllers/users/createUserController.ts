import { Request, Response } from "express";
import { User } from "../../models/index";



export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const userAlreadyExist = await User.findOne({ name: name }).exec();
    if (userAlreadyExist) {
      return res.status(500).send(`this user already exist`)
    }
    const newUser = new User({
      name: name,
      password: password,
    });

    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
};