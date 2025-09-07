import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true, // URL or path to logo image
  },
  labname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional, if you want to track who added it
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Logo = mongoose.model("Logo", logoSchema);
