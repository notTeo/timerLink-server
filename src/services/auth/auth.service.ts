import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, UserDocument } from "../../models";

export async function login(
  username: string,
  password: string,
): Promise<string> {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
}

export async function register(
  username: string,
  password: string,
  userPayload: Partial<UserDocument>,
): Promise<UserDocument> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, ...userPayload });
  await user.save();
  return user;
}
