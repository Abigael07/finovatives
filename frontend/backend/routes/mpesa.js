import express from "express";
import axios from "axios";
import moment from "moment";

const router = express.Router();

// 👉 Safaricom Daraja credentials (sandbox for testing)
const consumerKey = "XfqbWX9EP1OHA3rrvwNB8ApU1I9NkICAq9ksbYuOJBMAsBtR";
const consumerSecret = "OWwxBURW6hJ0SEsepaKJMFPHUEy2HViVQn5LMXT7q9cQZiplqdnmYIRpTjAs6R6M";
const shortcode = "174379"; // sandbox paybill
const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

// Function to generate access token
const generateToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );
  return response.data.access_token;
};

// 📌 Alias route for /initiate (so frontend works)
router.post("/initiate", async (req, res, next) => {
  req.url = "/stkpush"; // redirect internally
  next();
});

// 📌 STK Push route
router.post("/stkpush", async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference } = req.body;

    const token = await generateToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber, // customer phone number
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: "https://13fbc5125864.ngrok-free.app/api/mpesa/callback", // replace with ngrok in dev
        AccountReference: accountReference || "FINOVATIVE",
        TransactionDesc: "Course Payment",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("📌 STK Push error full:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 📌 Callback route (Safaricom calls this after payment)
router.post("/callback", (req, res) => {
  console.log("📩 M-Pesa Callback:", JSON.stringify(req.body, null, 2));
  res.json({ message: "Callback received successfully" });
});

export default router;
