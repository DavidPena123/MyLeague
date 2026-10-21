require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./db.js");

const app = express();

app.use(express.json());

// API routes. Each new feature adds one line here.
app.use("/api/health", require("./routes/health.js"));

// Unknown /api URLs get JSON, not a web page.
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Serve the built React app (created by "npm run build" in Part 5).
const clientDist = path.join(__dirname, "client", "dist");
app.use(express.static(clientDist));

// For any other URL, send the React app, so pages like /login still work when refreshed.
// (This is Express 5 syntax.)
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// Check the database connection when the server starts.
pool
  .query("SELECT 1")
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("MySQL connection failed:", err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});