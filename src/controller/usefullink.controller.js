import { UsefulLink } from "../models/usefulLink.models.js";

// Add a new link
export const addLink = async (req, res) => {
  try {
    

    const { name, url, category } = req.body;

    if (!name || !url) {
      return res.status(400).json({ success: false, message: "Name and URL are required" });
    }

    const newLink = await UsefulLink.create({ name, url, category });

    return res.status(201).json({
      success: true,
      message: "Link added successfully",
      data: newLink
    });
  } catch (error) {
    console.error("Error adding link:", error);
    return res.status(500).json({ success: false, message: "Failed to add link" });
  }
};

// Delete a link
export const deleteLink = async (req, res) => {
  try {
    
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Link ID is required" });

    const link = await UsefulLink.findById(id);
    if (!link)
      return res.status(404).json({ success: false, message: "Link not found" });

    await link.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Link deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    return res.status(500).json({ success: false, message: "Failed to delete link" });
  }
};

export const getAllUsefullLinks = async (req, res) => {
  try {
    const links = await UsefulLink.find().sort({ createdAt: -1 }); // latest first
    return res.status(200).json({
      success: true,
      data: links,
    });
  } catch (error) {
    console.error("Error fetching links:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch links",
    });
  }
};
