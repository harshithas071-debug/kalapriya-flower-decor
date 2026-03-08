const mongoose = require("mongoose");
const validator = require("validator");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: (v) => /^[+]?[\d\s\-()]{7,20}$/.test(v),
        message: "Please provide a valid phone number",
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => !v || validator.isEmail(v),
        message: "Please provide a valid email",
      },
    },
    event: {
      type: String,
      enum: ["Wedding", "Reception", "Engagement", "Naming Ceremony", "Birthday", "Corporate", "Other"],
      default: "Wedding",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "closed"],
      default: "new",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    source: {
      type: String,
      enum: ["website", "whatsapp", "referral", "other"],
      default: "website",
    },
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Enquiry", enquirySchema);
