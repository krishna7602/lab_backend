import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, 
  link: { type: String },
  important: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Announcement = mongoose.model("Announcement", announcementSchema);
