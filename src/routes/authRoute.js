import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

const registerValidation = [
  body("fullName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),
  body("emailAddress").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("emailAddress").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;
