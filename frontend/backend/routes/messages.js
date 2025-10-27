import express from 'express';
const router = express.Router();
import axios from "axios";
import nodemailer from "nodemailer";
import Message from "../models/message.js";

// --- Configure your email transport (Gmail SMTP with App Password) ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abigaelndinda7@gmail.com", // your Gmail address
    pass: "YOUR_APP_PASSWORD_HERE",   // App Password (not Gmail login password)
  },
});

// --- POST route for contact form ---
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, token } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: "All fields are required." });
    }

    // --- Verify reCAPTCHA ---
    const secretKey = "6Ldg6PQrAAAAABumfMpjKnfdsR3ZAzGjI3gdsOU-"; // 🔒 from Google reCAPTCHA
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const googleRes = await axios.post(verifyUrl);

    if (!googleRes.data.success) {
      return res.status(400).json({ ok: false, message: "reCAPTCHA verification failed." });
    }

    // --- Save message to MongoDB ---
    const newMessage = new Message({ name, email, phone, message });
    await newMessage.save();

    // --- Send notification email to admin ---
    await transporter.sendMail({
      from: `"Finovative Contact" <${email}>`,
      to: "abigaelndinda7@gmail.com", // ✅ use your actual admin email address
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h3>New Inquiry Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
        <hr/>
        <small>Sent from Finovative Insights contact form</small>
      `,
    });

    // --- Respond to frontend ---
    res.status(200).json({ ok: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("❌ Message route error:", err.message);
    res.status(500).json({ ok: false, message: "Server error. Please try again later." });
  }
});

export default router;

