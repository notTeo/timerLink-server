import mongoose, { Schema, Document, Model } from "mongoose";
import { LinkGroupDocument } from "./linkGroupSchema";

interface UserDocument extends Document {
  name: string;
  lastName: string;
  password: string;
  links: Array<LinkGroupDocument["_id"]>;
  entryDate: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Schema.Types.ObjectId, ref: "LinkGroup" }],
  entryDate: { type: Date, default: Date.now },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema,
);

export interface IUserPayload {
  name: string;
  lastName: string;
  username: string;
  password: string;
}

export { User, UserDocument };
