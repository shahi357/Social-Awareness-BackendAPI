import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Create a JWT token after the user logs in successfully.
const createToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, emailAddress, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({
      fullName,
      emailAddress,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
      },
    });
  } catch (err) {
    // Surface common, actionable errors for clients
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (err?.name === "ValidationError") {
      const errors = Object.values(err.errors || {}).map((e) => ({
        msg: e.message,
        path: e.path,
      }));
      return res.status(400).json({ message: "Validation failed", errors });
    }

    console.error("registerUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  // Check validation errors from the login route.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailAddress, password } = req.body;

  try {
    // Find the user by email address.
    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password in the database.
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Send token and basic user details back to the client.
    const token = createToken(user._id);

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
      },
    });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
