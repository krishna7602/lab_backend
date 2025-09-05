import { Announcement } from "../models/announcement.models.js";

// Add a new announcement
const addAnnouncement = async (req, res) => {
  try {
    const adminId = req.user?._id; // from verifyJwt middleware
    if (!adminId)
      return res.status(401).json({ success: false, message: "Unauthorized access" });

    const { title, date, link, important } = req.body;

    if (!title || !date) {
      return res
        .status(400)
        .json({ success: false, message: "Title and date are required" });
    }

    const newAnnouncement = await Announcement.create({
      title,
      date,
      link,
      important: important || false,
    });

    return res.status(201).json({
      success: true,
      message: "Announcement added successfully",
      data: newAnnouncement,
    });
  } catch (error) {
    console.error("Error adding announcement:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add announcement" });
  }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const adminId = req.user?._id; // from verifyJwt
    if (!adminId)
      return res.status(401).json({ success: false, message: "Unauthorized access" });

    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Announcement ID is required" });

    const announcement = await Announcement.findById(id);
    if (!announcement)
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });

    await announcement.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete announcement" });
  }
};


export {addAnnouncement,deleteAnnouncement}