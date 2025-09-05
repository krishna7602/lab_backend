import {ResearchArea} from "../models/researchArea.models.js";

// ✅ Add a new research area
export const addResearchArea = async (req, res) => {
  try {
    const { title, description, keywords } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Title and description are required" });
    }

    const newResearchArea = await ResearchArea.create({
      title,
      description,
      keywords: keywords || [],
    });

    return res.status(201).json({
      success: true,
      message: "Research area added successfully",
      data: newResearchArea,
    });
  } catch (error) {
    console.error("Error adding research area:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add research area" });
  }
};

// ✅ Get all research areas
export const getAllResearchAreas = async (req, res) => {
  try {
    const researchAreas = await ResearchArea.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: researchAreas,
    });
  } catch (error) {
    console.error("Error fetching research areas:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch research areas" });
  }
};

// ✅ Delete one research area
export const deleteResearchArea = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Research area ID is required" });
    }

    const researchArea = await ResearchArea.findById(id);
    if (!researchArea) {
      return res
        .status(404)
        .json({ success: false, message: "Research area not found" });
    }

    await researchArea.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Research area deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting research area:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete research area" });
  }
};
