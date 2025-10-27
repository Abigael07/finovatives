const express = require("express");
const axios = require("axios");

const router = express.Router();

// Keep a simple in-memory store for dev
// In production, store in DB
const payments = new Map();

const DARAJA_BASE =
  process.env.DARAJA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

async function getAccessToken() {
  const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const res = await axios.get(
    `${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
}

function mpesaTimestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}${MM}${dd}${hh}${mm}${ss}`;
}

// Initiate STK push
router.post("/initiate", async (req, res) => {
  const { amount, phoneNumber, courseId, accountReference } = req.body;

  try {
    const token = await getAccessToken();
    const timestamp = mpesaTimestamp();
    const shortcode = process.env.MPESA_SHORTCODE; // e.g. 174379 (sandbox)
    const passkey = process.env.MPESA_PASSKEY;

    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: accountReference || courseId || "FINOVATIVE",
      TransactionDesc: `Payment for ${courseId || "course"}`,
    };

    const mpesaRes = await axios.post(
      `${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`,
      payload,
      { headers: { Authorization: `Bearer ${token}` }, timeout: 20000 }
    );

    const { CheckoutRequestID, MerchantRequestID, CustomerMessage } = mpesaRes.data;

    payments.set(CheckoutRequestID, {
      status: "PENDING",
      amount,
      phoneNumber,
      courseId,
      createdAt: Date.now(),
      raw: mpesaRes.data,
    });

    res.json({
      checkoutRequestID: CheckoutRequestID,
      merchantRequestID: MerchantRequestID,
      customerMessage: CustomerMessage,
    });
  } catch (err) {
    console.error("STK initiate error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ message: err.response?.data?.errorMessage || "Payment initiation failed" });
  }
});

// Callback from M-Pesa (set this URL in your Daraja app)
router.post("/callback/mpesa", (req, res) => {
  try {
    const body = req.body;
    const callback = body?.Body?.stkCallback;
    if (!callback) {
      return res.status(400).json({ message: "Invalid callback payload" });
    }

    const checkoutID = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode; // 0 = success
    const resultDesc = callback.ResultDesc;

    if (resultCode === 0) {
      payments.set(checkoutID, {
        ...(payments.get(checkoutID) || {}),
        status: "SUCCESS",
        resultDesc,
        callback,
      });
    } else {
      payments.set(checkoutID, {
        ...(payments.get(checkoutID) || {}),
        status: "FAILED",
        resultDesc,
        callback,
      });
    }

    // M-Pesa expects a 200 OK quickly
    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (e) {
    console.error("Callback error", e);
    // Still respond 200
    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
});

// Frontend polls this
router.get("/status/:checkoutRequestID", (req, res) => {
  const id = req.params.checkoutRequestID;
  const info = payments.get(id);
  if (!info) return res.json({ status: "PENDING" });
  res.json({ status: info.status, message: info.resultDesc, data: info.callback });
});

// Optional: Query Daraja directly
router.get("/query/:checkoutRequestID", async (req, res) => {
  try {
    const token = await getAccessToken();
    const timestamp = mpesaTimestamp();
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: req.params.checkoutRequestID,
    };

    const qRes = await axios.post(
      `${DARAJA_BASE}/mpesa/stkpushquery/v1/query`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(qRes.data);
  } catch (e) {
    console.error("Query error", e.response?.data || e.message);
    res.status(500).json({ message: e.response?.data?.errorMessage || "Query failed" });
  }
});

module.exports = router;
