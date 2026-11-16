const express = require("express");
const pool = require("../db.js");
const { hashPassword } = require("../utils/Password.js");

const router = express.Router();

router.post("/register", async (request, response) => {
    const { email, password } = request.body || {};

    if (typeof email !== "string" || typeof password !== "string") {
        return response.status(400).json({ message: "Email and password are required." });
    }

    const address = email.trim().toLowerCase();

    if (address.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
        return response.status(400).json({ message: "Enter a valid email address." });
    }

    if (password.length < 8 || password.length > 128) {
        return response.status(400).json({ message: "Use a password between 8 and 128 characters." });
    }

    try {
        const [existingAccounts] = await pool.execute(
            "SELECT 1 FROM `user` WHERE email = ?",
            [address]
        );

        if (existingAccounts.length > 0) {
            return response.status(409).json({ message: "An account with this email already exists." });
        }

        const passwordHash = await hashPassword(password);

        await pool.execute(
            "INSERT INTO `user` (email, password_hash, role, email_verified) VALUES (?, ?, ?, ?)",
            [address, passwordHash, "PARENT", false]
        );

        return response.status(201).json({ message: "Account created successfully." });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return response.status(409).json({ message: "An account with this email already exists." });
        }

        return response.status(500).json({ message: "Unable to create your account. Please try again later." });
    }
});

module.exports = router;
