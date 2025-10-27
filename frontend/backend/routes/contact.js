import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all required fields." });
    }

    // ✅ Create mail transporter (Gmail + App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Define mail content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your inbox
      subject: `New Message from ${name}`,
      html: `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    console.log("📧 Email sent successfully from:", email);

    // ✅ Always return valid JSON
    return res.status(200).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

export default router;
