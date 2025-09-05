import { Person } from "../models/people.models.js";

// Add a student (PhD or M.Tech)
const addStudent = async (req, res) => {
  try {
    const adminId = req.user?._id; // coming from verifyJwt
    if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized access" });

    const { name, role, category, bio, imageUrl, email, socialLinks } = req.body;

    if (!name || !role || !category) {
      return res.status(400).json({ success: false, message: "Name, role, and category are required" });
    }

    const newStudent = await Person.create({
      name,
      role,
      category,
      bio,
      imageUrl,
      email,
      socialLinks,
    });

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ success: false, message: "Failed to add student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const adminId = req.user?._id; // coming from verifyJwt
    if (!adminId)
      return res.status(401).json({ success: false, message: "Unauthorized access" });

    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Student ID is required" });

    const student = await Person.findById(id);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    await student.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};


const getAllStudent = async (req, res) => {
  try {
    const students = await Person.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};
export {addStudent,deleteStudent,getAllStudent}
