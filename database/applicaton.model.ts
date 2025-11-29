import mongoose, { Schema, Document, Model } from "mongoose";

import { IJob } from "./job.model";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export type ApplicationStatus = "submitted" | "reviewed" | "interviewing" | "offered" | "rejected" | "withdrawn";

export interface IApplication extends Document {
  job: mongoose.Types.ObjectId | IJob; // ref: Job
  candidate: mongoose.Types.ObjectId; // ref: CandidateProfile
  status: ApplicationStatus;
  resumeSnapshot: string; // Stored at submission time
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------
// 2. SCHEMA
// ------------------------------
const applicationSchema = new Schema<IApplication>(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    candidate: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    status: {
      type: String,
      enum: ["submitted", "reviewed", "interviewing", "offered", "rejected", "withdrawn"],
      default: "submitted",
    },

    // Important snapshot — resume used at time of applying
    resumeSnapshot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ------------------------------
// 3. UNIQUE INDEX (prevent duplicate applications)
// ------------------------------
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

// ------------------------------
// 4. EXPORT MODEL (Next.js-safe)
// ------------------------------
export const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", applicationSchema);
