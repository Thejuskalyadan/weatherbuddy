import express, { request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 💡 Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("Connection error ❌:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userName: String,
  schoolEmail: { type: String, required: true, unique: true },
  phoneNumber: String,
  address: String,
  lat: String,
  lon: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// 🚀 Registration Route
app.post("/register", async (req, res) => {
  try {
    const { userName, schoolEmail, phoneNumber, address, lat, lon, password } =
      req.body;

    if (!schoolEmail || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ schoolEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const customId = nanoid(6);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: customId,
      userName,
      schoolEmail,
      phoneNumber,
      address,
      lat,
      lon,
      password: hashedPassword,
    });

    await newUser.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: schoolEmail,
      subject: "Welcome to Weather Buddy! 🌤️",
      text: `Hi ${userName},

Thank you for registering with Weather Buddy!

Your Login Credentials:
User ID (Email): ${schoolEmail}
Password: ${password}

Please keep this information secure.

- Weather Buddy Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error ❌:", error);
      } else {
        console.log("Email sent ✅:", info.response);
      }
    });

    res.status(201).json({ message: "User registered and email sent ✅" });
  } catch (error) {
    console.error("Registration error ❌:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔐 Login Route
app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  console.log(req.body);
  if (!userId || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }
  console.log(userId);
  try {
    const user = await User.findOne({ schoolEmail: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error ❌:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(3001, () =>
  console.log("Server running on http://localhost:3001 🚀")
);
