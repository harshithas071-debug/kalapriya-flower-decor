const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Reception",
        "Mantapa",
        "Door Decoration",
        "Name Board",
        "Ramp Decoration",
        "Jade",
        "Hara",
        "Chapra Decoration",
        "Naming Ceremony",
      ],
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
      trim: true,
      maxlength: [200, "Caption cannot exceed 200 characters"],
    },
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String, // Cloudinary public_id for deletion
      default: null,
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    uploadedBy: {
      type: String,
      default: "admin",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

imageSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model("Image", imageSchema);
