import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/user")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("Connection error ❌:", err));

// ✅ User Schema (Simplified)
const userSchema = new mongoose.Schema({
  userName: { type: String, trim: true },
  schoolEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: String,
  address: String,
  lat: String,
  lon: String,
  password: { type: String, required: true }, // Stored as plain text
});

const User = mongoose.model("User", userSchema);

// 🚀 Registration Route (No Email, No Hashing)
app.post("/register", async (req, res) => {
  try {
    const { userName, schoolEmail, phoneNumber, address, lat, lon, password } = req.body;

    const normalizedEmail = typeof schoolEmail === "string" ? schoolEmail.trim().toLowerCase() : "";

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ schoolEmail: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      userName: typeof userName === "string" ? userName.trim() : userName,
      schoolEmail: normalizedEmail,
      phoneNumber,
      address,
      lat,
      lon,
      password, // Plain text
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    console.error("Registration error ❌:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔐 Login Route (Plain Text Comparison)
app.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }

  try {
    const rawIdentifier = typeof userId === "string" ? userId.trim() : "";
    const normalizedIdentifier = rawIdentifier.toLowerCase();

    // Find user by email OR username (frontend calls it userId)
    const user = await User.findOne({
      $or: [{ schoolEmail: normalizedIdentifier }, { userName: rawIdentifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Direct string comparison instead of bcrypt.compare
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error ❌:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () =>
  console.log("Server running on http://localhost:3001 🚀")
);