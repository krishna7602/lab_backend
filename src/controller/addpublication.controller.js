import { Publication } from "../models/publication.models.js";

// Add a new publication
export const addPublication = async (req, res) => {
  try {
    const { title, authors, journal, year, description, link } = req.body;

    if (!title || !authors || !journal || !year) {
      return res.status(400).json({
        error: "Title, authors, journal, and year are required",
      });
    }

    const newPub = new Publication({
      title,
      authors,
      journal,
      year,
      description,
      link,
    });

    await newPub.save();

    return res.status(201).json({
      message: "Publication added successfully",
      data: newPub,
    });
  } catch (error) {
    console.error("Error adding publication:", error);
    return res.status(500).json({
      error: "Failed to add publication",
      details: error.message,
    });
  }
};

// Delete a publication by ID
export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Publication ID is required" });
    }

    const deletedPublication = await Publication.findByIdAndDelete(id);

    if (!deletedPublication) {
      return res.status(404).json({ error: "Publication not found" });
    }

    return res.status(200).json({
      message: "Publication deleted successfully",
      data: deletedPublication,
    });
  } catch (error) {
    console.error("Error deleting publication:", error);
    return res.status(500).json({
      error: "Failed to delete publication",
      details: error.message,
    });
  }
};

// Get all publications
export const getAllPublication = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json({ data: publications });
  } catch (error) {
    console.error("Error fetching publications:", error);
    return res.status(500).json({
      error: "Failed to fetch publications",
      details: error.message,
    });
  }
};
