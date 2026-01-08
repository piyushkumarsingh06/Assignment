// controllers/authController.js
const db = require("../config/db"); // make sure this is your correct MySQL connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================== REGISTER ==================
exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result && result.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error("Hashing error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            // Insert user into database
            db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hash],
                (err, result) => {
                    if (err) {
                        console.error("DB insert error:", err);
                        return res.status(500).json({ message: "Internal server error" });
                    }

                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        });
    });
};

// ================== LOGIN ==================
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Compare error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET, // replace with process.env.JWT_SECRET in production
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Login successful", token });
        });
    });
};
