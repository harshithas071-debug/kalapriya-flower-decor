const express = require("express");
const nodemailer = require("nodemailer");
const Enquiry = require("../models/Enquiry");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ── Email transporter ────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

const sendEnquiryEmail = async (enquiry) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Kalapriya Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `🌸 New Enquiry from ${enquiry.name} — ${enquiry.event}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;border:1px solid #C9963F;padding:0">
          <div style="background:#1A0D00;padding:20px;text-align:center">
            <h1 style="color:#E8C97A;font-size:22px;margin:0">Kalapriya Flower Decor</h1>
            <p style="color:#C9963F;margin:5px 0 0;font-size:12px;letter-spacing:2px">NEW ENQUIRY RECEIVED</p>
          </div>
          <div style="padding:30px;background:#FDF8F0">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#8A7A6A;font-size:13px;width:120px">Name</td><td style="padding:8px 0;font-weight:bold;color:#2D1500">${enquiry.name}</td></tr>
              <tr><td style="padding:8px 0;color:#8A7A6A;font-size:13px">Phone</td><td style="padding:8px 0;font-weight:bold;color:#2D1500">${enquiry.phone}</td></tr>
              <tr><td style="padding:8px 0;color:#8A7A6A;font-size:13px">Email</td><td style="padding:8px 0;color:#2D1500">${enquiry.email || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#8A7A6A;font-size:13px">Event</td><td style="padding:8px 0;color:#2D1500"><span style="background:#C9963F;color:white;padding:2px 10px;border-radius:2px;font-size:12px">${enquiry.event}</span></td></tr>
              <tr><td style="padding:8px 0;color:#8A7A6A;font-size:13px;vertical-align:top">Message</td><td style="padding:8px 0;color:#2D1500;line-height:1.6">${enquiry.message}</td></tr>
              <tr><td style="padding:8px 0;color:#8A7A6A;font-size:13px">Received</td><td style="padding:8px 0;color:#8A7A6A;font-size:12px">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>
            </table>
          </div>
          <div style="background:#1A0D00;padding:15px;text-align:center">
            <p style="color:rgba(251,243,224,0.5);font-size:11px;margin:0">Reply directly to this email or call the customer back.</p>
          </div>
        </div>
      `,
    });
    console.log("📧 Enquiry email sent to", process.env.EMAIL_TO);
  } catch (err) {
    console.error("Email send failed:", err.message);
  }
};

// ── POST /api/enquiries  — submit enquiry (public) ───────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, event, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "Name, phone and message are required." });
    }

    const enquiry = await Enquiry.create({ name, phone, email, event, message });

    // Fire-and-forget email notification
    sendEnquiryEmail(enquiry);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully. We will contact you within 24 hours.",
      data: { id: enquiry._id },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/enquiries  — get all enquiries (admin) ──────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const total = await Enquiry.countDocuments(filter);
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: enquiries,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/enquiries/:id  — update status/notes (admin) ─────────────────
router.patch("/:id", protect, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true, runValidators: true }
    );
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.json({ success: true, message: "Enquiry updated.", data: enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/enquiries/:id  — delete enquiry (admin) ──────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.json({ success: true, message: "Enquiry deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
