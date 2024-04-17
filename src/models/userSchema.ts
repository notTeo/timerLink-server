import mongoose, { Schema, Document, Model } from "mongoose";
import { LinkGroup, LinkGroupDocument } from "./linkGroupSchema";

interface UserDocument extends Document {
  name: string;
  password: string;
  linkCollections: Array<LinkGroupDocument['_id']>;
  entryDate: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  linkCollections: [{ type: Schema.Types.ObjectId, ref: "LinkGroup" }],
  entryDate: { type: Date, default: Date.now },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export { User, UserDocument };
