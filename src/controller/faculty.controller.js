import { Faculty } from "../models/faculty.models.js";

// ➤ Add new Faculty
export const addFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({ success: true, message: "Faculty added successfully", data: faculty });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error adding faculty", error: error.message });
  }
};

// ➤ Get all Faculty
export const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: facultyList });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching faculty", error: error.message });
  }
};

// ➤ Update Faculty by ID
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }

    res.status(200).json({ success: true, message: "Faculty updated successfully", data: faculty });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error updating faculty", error: error.message });
  }
};

// ➤ Delete Faculty by ID
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndDelete(id);

    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }

    res.status(200).json({ success: true, message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting faculty", error: error.message });
  }
};
