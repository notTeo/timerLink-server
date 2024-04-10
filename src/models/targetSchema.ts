import mongoose, { Schema, Document, Model } from "mongoose";

interface TargetDocument extends Document {
  url: string;
  expireDate?: Date;
  startDate?: Date;
  activeClicks?: number;
  inactiveClicks?: number;
}

const targetSchema: Schema = new Schema({
  url: { type: String, required: true },
  expireDate: { type: Date },
  startDate: { type: Date },
  activeClicks: { type: Number, default: 0 },
  inactiveClicks: { type: Number, default: 0 },
});

const Target: Model<TargetDocument> = mongoose.model<TargetDocument>("Target", targetSchema);

export { Target, TargetDocument };
