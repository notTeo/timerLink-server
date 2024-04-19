import { User } from "../../models/userSchema";
import { Response } from "express";
import { sendErrorResponse } from "../../utils/responses";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

export async function getAllUsers(res: Response) {
  try {
    return await User.find().populate({
      path: "linkCollections",
      populate: {
        path: "targets",
      },
    });
  } catch (e) {
    console.log("Error getting users", e);
    sendErrorResponse(res, "Error getting users", 500);
  }
}

export async function createNewUser(
  name: string,
  password: string,
  res: Response
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name: name, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    
    return { user: newUser, token: token };
  } catch (e) {
    console.log("Error creating user", e);
    sendErrorResponse(res, "Error creating user", 500);
  }
}

export async function getUserById(userId: string, res: Response) {
  try {
    const user = await User.findById(userId).populate({
      path: "linkCollections",
      populate: {
        path: "targets",
      },
    });
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    return user;
  } catch (e) {
    console.log("Error getting user", e);
  }
}

export async function updateUserById(
  userId: string,
  name: string,
  password: string,
  res:Response
) {
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    if (!name) {
      name = user.name;
    }
    if (!password) {
      password = user.password;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.findByIdAndUpdate(
      userId,
      {
        name: name,
        password: hashedPassword,
      },
      { new: true }
    );
  } catch (e) {
    console.log("Error updating user", e);
    sendErrorResponse(res, "Error updating user", 500);
  }
}

export async function deleteUserById(userId: string, res: Response) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
     return sendErrorResponse(res, "Error user not found", 404);
    }
    return deletedUser;
  } catch (e) {
    console.log("Error deleting user", e);
  }
}

export async function getLinksByUserId(userId: string, res: Response) {
  try {
    const user = await User.findById(userId).populate("linkCollections");
  if (!user) {
    return sendErrorResponse(res, "Error getting user links", 500);
  }
  return user.linkCollections;
  } catch (e) {
    console.log("Error getting user links", e);
  }
  
}
