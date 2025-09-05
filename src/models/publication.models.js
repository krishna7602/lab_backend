import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  journal: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Publication = mongoose.model("Publication", publicationSchema);
