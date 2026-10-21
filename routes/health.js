const express = require("express");
const pool = require("../db.js");

const router = express.Router();

// GET /api/health: is the server running?
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// GET /api/health/db: can the server reach MySQL?
router.get("/db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");
    res.json({ database: "connected", rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;