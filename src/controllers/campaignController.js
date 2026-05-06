import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Campaign from "../models/campaignModel.js";

const getUploadedImagePath = (file) => {
  if (!file) return null;
  return `/uploads/campaigns/${file.filename}`;
};

const buildCampaignPayload = (
  body,
  { defaultStatus = false, uploadedImagePath = null } = {}
) => {
  const payload = {
    title: body.title,
    category: body.category,
    fundingGoal: body.fundingGoal,
    description: body.description,
    campaignImage: uploadedImagePath || body.campaignImage,
  };

  if (body.status || defaultStatus) {
    payload.status = body.status || "draft";
  }

  return payload;
};

const handleValidationError = (err, res, logLabel) => {
  if (err?.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((e) => ({
      msg: e.message,
      path: e.path,
    }));
    return res.status(400).json({ message: "Validation failed", errors });
  }

  console.error(`${logLabel}:`, err);
  return res.status(500).json({ message: "Server error" });
};

export const createCampaign = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const campaign = await Campaign.create({
      ...buildCampaignPayload(req.body, {
        defaultStatus: true,
        uploadedImagePath: getUploadedImagePath(req.file),
      }),
      owner: req.user._id,
    });

    return res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (err) {
    return handleValidationError(err, res, "createCampaign error");
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ campaigns });
  } catch (err) {
    console.error("getCampaigns error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCampaignById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid campaign id" });
  }

  try {
    const campaign = await Campaign.findOne({ _id: id, owner: req.user._id });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    return res.status(200).json({ campaign });
  } catch (err) {
    console.error("getCampaignById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCampaign = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid campaign id" });
  }

  try {
    const campaign = await Campaign.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      buildCampaignPayload(req.body, {
        uploadedImagePath: getUploadedImagePath(req.file),
      }),
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    return res.status(200).json({
      message: "Campaign updated successfully",
      campaign,
    });
  } catch (err) {
    return handleValidationError(err, res, "updateCampaign error");
  }
};

export const deleteCampaign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid campaign id" });
  }

  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    return res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error("deleteCampaign error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
