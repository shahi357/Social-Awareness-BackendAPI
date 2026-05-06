import mongoose from "mongoose";

export const CAMPAIGN_CATEGORIES = [
  "Healthcare",
  "Education",
  "Environment",
  "Community",
  "Equality",
  "Culture",
];

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Campaign title is required"],
      trim: true,
      minlength: [3, "Campaign title must be at least 3 characters"],
      maxlength: [120, "Campaign title cannot exceed 120 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: CAMPAIGN_CATEGORIES,
        message: "Category is not supported",
      },
    },
    fundingGoal: {
      type: Number,
      required: [true, "Funding goal is required"],
      min: [1, "Funding goal must be greater than 0"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    campaignImage: {
      type: String,
      required: [true, "Campaign image is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "launched"],
      default: "draft",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
