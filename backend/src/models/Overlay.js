import mongoose from "mongoose";

const overlaySchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: [true, "Content is required"],
    validate: {
      validator: function(v) {
        // Only text content is allowed now
        return v.trim().length > 0;
      },
      message: props => `Invalid content: ${props.value}. Content cannot be empty`
    }
  },
  position: {
    x: {
      type: Number,
      required: [true, "Position X coordinate is required"],
      min: [0, "Position X must be at least 0"],
      max: [100, "Position X cannot exceed 100"]
    },
    y: {
      type: Number,
      required: [true, "Position Y coordinate is required"],
      min: [0, "Position Y must be at least 0"],
      max: [100, "Position Y cannot exceed 100"]
    }
  },
  size: {
    width: {
      type: Number,
      required: [true, "Width is required"],
      min: [10, "Width must be at least 10"]
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
      min: [10, "Height must be at least 10"]
    }
  },
  // New design properties
  design: {
    fontSize: {
      type: Number,
      default: 18,
      min: [8, "Font size must be at least 8"],
      max: [72, "Font size cannot exceed 72"]
    },
    bgColor: {
      type: String,
      default: "#ffffff",
      validate: {
        validator: function(v) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: props => `${props.value} is not a valid hex color!`
      }
    },
    textColor: {
      type: String,
      default: "#000000",
      validate: {
        validator: function(v) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: props => `${props.value} is not a valid hex color!`
      }
    },
    bgOpacity: {
      type: Number,
      default: 80,
      min: [0, "Background opacity must be between 0 and 100"],
      max: [100, "Background opacity must be between 0 and 100"]
    },
    showBg: {
      type: Boolean,
      default: true
    }
  }
}, { 
  timestamps: true,
  strict: "throw"
});

export default mongoose.model("Overlay", overlaySchema);