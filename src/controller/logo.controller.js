import { Logo } from "../models/logo.models.js";


export const addLogo = async (req, res) => {
  try {
    const { logo, labname, description } = req.body;
    const user = req.user?._id;

    if (!logo || !labname || !description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newLogo = await Logo.create({
      logo,
      labname,
      description,
      createdBy: user,
    });

    res.status(201).json({
      success: true,
      message: "Logo added successfully",
      data: newLogo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding logo", error: error.message });
  }
};


export const deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLogo = await Logo.findByIdAndDelete(id);
    if (!deletedLogo) {
      return res.status(404).json({ success: false, message: "Logo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Logo deleted successfully",
      data: deletedLogo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting logo", error: error.message });
  }
};


export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).json({ success: true, data: logos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching logos", error: error.message });
  }
};

export const updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { logo,labname,description } = req.body; // Adjust fields according to schema

    const logoo = await Logo.findByIdAndUpdate(id, {logo,labname,description}, { new: true });

    if (!logoo) {
      return res.status(404).json({ success: false, message: "Logo not found" });
    }

    return res.status(200).json({ success: true, data: logoo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

