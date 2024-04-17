import { User } from "../../models/userSchema";
import  bcrypt from 'bcrypt'

export async function getAllUsers() {

  return await User.find().populate({
    path: 'linkCollections',
    populate: {
      path: 'targets'
    }
  });
}

export async function createNewUser(name: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name: name, password: hashedPassword });
  return await newUser.save();
}

export async function getUserById(userId: string) {
  const user = await User.findById(userId).populate('linkCollections');
  return user
}

export async function updateUserById(
  userId: string,
  name: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.findByIdAndUpdate(
    userId,
    {
      name: name,
      password: hashedPassword,
    },
    { new: true }
  );
  
}

export async function deleteUserById(userId: string) {
  return await User.findByIdAndDelete(userId);
}

export async function getLinksByUserId(userId: string) {
  const user = await User.findById(userId).populate('linkCollections');
  if (!user) {
    throw new Error('User not found');
  }
  return user.linkCollections;
}