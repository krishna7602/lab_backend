import {Publication} from "../models/publication.models.js"; // use import syntax if using ES modules

// Add a new publication
const addPublication = async (req, res) => {
  try {
    const adminId = req.user?._id;
    console.log(adminId)
    if (!adminId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const { title, authors, journal, year, description, link } = req.body;
    console.log(title,authors,journal)

    if (!title || !authors || !journal || !year) {
      return res.status(400).json({
        success: false,
        message: "Title, authors, journal, and year are required",
      });
    }

    const newPub = await Publication.create({
      title,
      authors,
      journal,
      year,
      description,
      link,
    });

    return res.status(201).json({
      success: true,
      message: "Publication added successfully",
      data: newPub,
    });
  } catch (error) {
    console.error("Error adding publication:", error);
    return res.status(500).json({ success: false, message: "Failed to add publication" });
  }
};

// Delete a publication by ID
const deletePublication = async (req, res) => {
  try {
    const adminId = req.user?._id; // from verifyJwt
    if (!adminId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Publication ID is required" });
    }

    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ success: false, message: "Publication not found" });
    }

    await publication.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Publication deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting publication:", error);
    return res.status(500).json({ success: false, message: "Failed to delete publication" });
  }
};


const getAllPublication = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json({
      success: true,
      data: publications,
    });
  } catch (error) {
    console.error("Error fetching publications:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch publications",
    });
  }
};

export{
    addPublication,
    deletePublication,
    getAllPublication
}
