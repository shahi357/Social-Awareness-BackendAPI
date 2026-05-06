import express from "express";
import { body } from "express-validator";
import {
  createCampaign,
  deleteCampaign,
  getCampaignById,
  getCampaigns,
  updateCampaign,
} from "../controllers/campaignController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  handleUploadError,
  uploadCampaignImage,
} from "../middleware/uploadMiddleware.js";
import { CAMPAIGN_CATEGORIES } from "../models/campaignModel.js";

const router = express.Router();

const campaignValidation = [
  body("title")
    .isString()
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("Campaign title must be between 3 and 120 characters"),
  body("category")
    .isIn(CAMPAIGN_CATEGORIES)
    .withMessage("Category must be one of: Healthcare, Education, Environment, Community, Equality, Culture"),
  body("fundingGoal")
    .isFloat({ gt: 0 })
    .withMessage("Funding goal must be greater than 0")
    .toFloat(),
  body("description")
    .isString()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("campaignImage")
    .custom((value, { req }) => Boolean(req.file || value))
    .withMessage("Campaign image is required"),
  body("status")
    .optional()
    .isIn(["draft", "launched"])
    .withMessage("Status must be draft or launched"),
];

router.use(protect);

router
  .route("/")
  .post(
    uploadCampaignImage.single("campaignImage"),
    handleUploadError,
    campaignValidation,
    createCampaign
  )
  .get(getCampaigns);
router
  .route("/:id")
  .get(getCampaignById)
  .put(
    uploadCampaignImage.single("campaignImage"),
    handleUploadError,
    campaignValidation,
    updateCampaign
  )
  .delete(deleteCampaign);

export default router;
