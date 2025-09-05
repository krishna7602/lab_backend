import mongoose from "mongoose";

const researchAreaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export const ResearchArea = mongoose.model("ResearchArea", researchAreaSchema);


