import mongoose from "mongoose";

const overlaySchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: [true, "Content is required"],
    validate: {
      validator: function(v) {
        // Basic check for URL-like content OR non-empty text
        if (v.startsWith("http://") || v.startsWith("https://")) {
          // Simple URL format validation
          return /^https?:\/\/\S+$/.test(v);
        }
        // Non-URL text content must be at least 1 character
        return v.trim().length > 0;
      },
      message: props => `Invalid content: ${props.value}. Must be valid URL or non-empty text`
    }
  },
  position: {
    x: {
      type: Number,
      required: [true, "Position X coordinate is required"],
      min: [0, "Position X must be at least 0"]
    },
    y: {
      type: Number,
      required: [true, "Position Y coordinate is required"],
      min: [0, "Position Y must be at least 0"]
    }
  },
  size: {
    width: {
      type: Number,
      required: [true, "Width is required"],
      min: [1, "Width must be at least 1"]
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
      min: [1, "Height must be at least 1"]
    }
  }
}, { 
  timestamps: true,
  // Reject unknown fields to prevent invalid data
  strict: "throw"
});

// Optional: Add text index for content search capabilities
overlaySchema.index({ content: "text" });

export default mongoose.model("Overlay", overlaySchema);