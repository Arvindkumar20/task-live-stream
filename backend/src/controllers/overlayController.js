import Overlay from "../models/Overlay.js";

// Create a new overlay
export const createOverlay = async (req, res) => {
  try {
    const { content, position, size, design } = req.body;

    // Basic validation
    if (!content || !position || !size) {
      return res.status(400).json({ 
        message: "Content, position, and size are required" 
      });
    }

    const newOverlay = new Overlay({
      content,
      position,
      size,
      design: design || {
        fontSize: 18,
        bgColor: "#ffffff",
        textColor: "#000000",
        bgOpacity: 80,
        showBg: true
      }
    });

    const savedOverlay = await newOverlay.save();
    res.status(201).json(savedOverlay);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate content detected' });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Update an existing overlay
export const updateOverlay = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the overlay exists
    const existingOverlay = await Overlay.findById(id);
    if (!existingOverlay) {
      return res.status(404).json({ message: "Overlay not found" });
    }

    // Update the overlay
    const updatedOverlay = await Overlay.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json(updatedOverlay);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get all overlays
export const getOverlays = async (req, res) => {
  try {
    const overlays = await Overlay.find().sort({ createdAt: -1 });
    res.json(overlays);
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete an overlay
export const deleteOverlay = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedOverlay = await Overlay.findByIdAndDelete(id);
    
    if (!deletedOverlay) {
      return res.status(404).json({ message: "Overlay not found" });
    }
    
    res.json({ 
      message: "Overlay deleted successfully", 
      id: deletedOverlay._id 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get a single overlay by ID
export const getOverlayById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const overlay = await Overlay.findById(id);
    
    if (!overlay) {
      return res.status(404).json({ message: "Overlay not found" });
    }
    
    res.json(overlay);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid overlay ID" });
    }
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};