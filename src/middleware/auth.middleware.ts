import { header, ValidationChain } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const token: ValidationChain[] = [
  header("authorization")
    .exists()
    .withMessage("Please provide a token")
    .custom((header) => {
      const token = header?.split("Bearer ")[1];
      return !!token;
    })
    .withMessage("Invalid token"),
];

export async function validateToken(req, res, next) {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId, { _id: 1, username: 1 });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIzZjc2NjZiODljNjMzNzdiNmNhYjAiLCJpYXQiOjE3MTM2MzQ1NzV9.ZvJDFJ1b7mggCh_eORLiDyAi8_oRUTRRaMEVbZSFY0I
