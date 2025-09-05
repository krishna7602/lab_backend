import { UsefulLink } from "../models/usefulLink.models.js";

// Add a new link
export const addLink = async (req, res) => {
  try {
    const adminId = req.user?._id; // coming from verifyJwt
    if (!adminId)
      return res.status(401).json({ success: false, message: "Unauthorized access" });

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
    const adminId = req.user?._id; // coming from verifyJwt
    if (!adminId)
      return res.status(401).json({ success: false, message: "Unauthorized access" });

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
