import mongoose from "mongoose";

const usefulLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String }, // optional: group by type
  createdAt: { type: Date, default: Date.now }
});

export const UsefulLink = mongoose.model("UsefulLink", usefulLinkSchema);
