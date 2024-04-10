import mongoose, { Schema, Document, Model } from "mongoose";
import { Target, TargetDocument } from "./targetSchema";

interface LinkGroupDocument extends Document {
  linkName: string;
  targets: Array<TargetDocument['_id']>;
}

const linkGroupSchema: Schema = new Schema({
  linkName: { type: String, required: true },
  targets: [{ type: Schema.Types.ObjectId, ref: 'Target' }],
});

const LinkGroup: Model<LinkGroupDocument> = mongoose.model<LinkGroupDocument>("LinkGroup", linkGroupSchema);

export { LinkGroup, LinkGroupDocument };
