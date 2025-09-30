const axios = require("axios");

// Your Safaricom app credentials
const consumerKey = "XfqbWX9EP1OHA3rrvwNB8ApU1I9NkICAq9ksbYuOJBMAsBtR";
const consumerSecret = "OWwxBURW6hJ0SEsepaKJMFPHUEy2HViVQn5LMXT7q9cQZiplqdnmYIRpTjAs6R6M";

// Encode to Base64
const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

// Generate token
axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
  headers: {
    Authorization: `Basic ${auth}`
  }
})
.then(res => {
  console.log("✅ Access Token:", res.data.access_token);
  console.log("⏳ Expires in:", res.data.expires_in, "seconds");
})
.catch(err => {
  console.error("❌ Error:", err.response ? err.response.data : err.message);
});
