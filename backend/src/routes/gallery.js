const express = require("express");
const Image = require("../models/Image");
const { protect } = require("../middleware/auth");
const { upload, cloudinary } = require("../config/cloudinary");

const router = express.Router();

// ── GET /api/gallery  — all images grouped by category (public) ──────────────
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const images = await Image.find(filter).sort({ order: 1, createdAt: -1 });

    // Group by category
    const grouped = {};
    images.forEach((img) => {
      if (!grouped[img.category]) grouped[img.category] = [];
      grouped[img.category].push({
        id: img._id,
        url: img.url,
        thumbnailUrl: img.thumbnailUrl || img.url,
        caption: img.caption,
        category: img.category,
        createdAt: img.createdAt,
      });
    });

    res.json({ success: true, data: grouped, total: images.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/gallery/stats  — image count per category (admin) ───────────────
router.get("/stats", protect, async (req, res) => {
  try {
    const stats = await Image.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const total = await Image.countDocuments({ isActive: true });
    res.json({ success: true, data: stats, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/gallery  — upload image (admin, file upload) ───────────────────
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { caption, category } = req.body;

    if (!caption || !category) {
      return res.status(400).json({ success: false, message: "Caption and category are required." });
    }

    let url, publicId, thumbnailUrl;

    if (req.file) {
      // Cloudinary file upload
      url = req.file.path;
      publicId = req.file.filename;
      // Generate smaller thumbnail
      thumbnailUrl = cloudinary.url(publicId, { width: 400, height: 300, crop: "fill", quality: "auto:eco" });
    } else if (req.body.imageUrl) {
      // URL-based upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.imageUrl, {
        folder: `kalapriya/${category}`,
        transformation: [{ width: 1200, height: 900, crop: "limit", quality: "auto:good" }],
      });
      url = result.secure_url;
      publicId = result.public_id;
      thumbnailUrl = cloudinary.url(publicId, { width: 400, height: 300, crop: "fill", quality: "auto:eco" });
    } else {
      return res.status(400).json({ success: false, message: "Image file or URL is required." });
    }

    const image = await Image.create({
      category,
      caption,
      url,
      publicId,
      thumbnailUrl,
      uploadedBy: req.admin.username,
    });

    res.status(201).json({ success: true, message: "Image uploaded successfully.", data: image });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/gallery/:id  — update caption/order (admin) ───────────────────
router.patch("/:id", protect, async (req, res) => {
  try {
    const { caption, order, isActive } = req.body;
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { ...(caption && { caption }), ...(order !== undefined && { order }), ...(isActive !== undefined && { isActive }) },
      { new: true, runValidators: true }
    );
    if (!image) return res.status(404).json({ success: false, message: "Image not found." });
    res.json({ success: true, message: "Image updated.", data: image });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/gallery/:id  — delete from DB + Cloudinary (admin) ───────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: "Image not found." });

    // Delete from Cloudinary
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Image.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Image deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
