import { validationResult } from "express-validator";
import User from "../models/userModel.js";

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
