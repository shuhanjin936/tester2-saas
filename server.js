const express = require("express");
const path = require("path");

const app = express();

// Read incoming webhook bodies no matter what format they're sent in
app.use(express.json({ type: "*/*" }));

// Job 1: serve your website at the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Job 2: receive Subotiz webhook events and log them
app.post("/webhook", (req, res) => {
  console.log("=== Webhook received at", new Date().toISOString(), "===");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Body:", JSON.stringify(req.body, null, 2));

  // Always reply 200 quickly so Subotiz knows you got it
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));