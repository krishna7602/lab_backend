import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    default: "Bio Technology",
  },
  qualifications: {
    type: [String], // Array of degrees
    required: true,
  },
  bio: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  achievements: {
    publications: { type: Number, default: 0 },
    awards: { type: [String], default: [] },
    projects: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Faculty = mongoose.model("Faculty", facultySchema);
