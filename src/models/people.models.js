import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Professor", "Assistant Professor", "Research Associate", "Lab Director"], required: true },
  category: { type: String, enum: ["PhD Scholar", "M.Tech Student", "Other"], required: true },
  bio: { type: String }, 
  imageUrl: { type: String }, 
  email: { type: String },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Person = mongoose.model("Person", peopleSchema);
