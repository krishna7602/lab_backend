import { Gallery } from "../models/gallery.models.js"

// Add new image
export const addImage = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ error: "Title and Image URL are required" });
    }

    const newImage = new Gallery({ title, imageUrl });
    await newImage.save();

    res.status(201).json({ message: "Image added successfully", data: newImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to add image", details: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ data: images });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images", details: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully", data: deletedImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image", details: error.message });
  }
};
