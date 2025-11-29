import mongoose, { Schema, Document, Model } from "mongoose";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export interface ICompanyLogo {
  id?: string;
  url?: string;
}

export interface IEmployerProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  accountType?: string;
  companyName: string;
  companySize: string;
  companyLogo?: ICompanyLogo;
  website?: string;
  country: string;
  industry: string;
  about?: string;
  savedCandidate?: mongoose.Types.ObjectId[];
  noOfJobPost?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------
// Employee SCHEMAA
// ------------------------------
const employerProfileSchema = new Schema<IEmployerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, index: true },
    accountType: { type: String, default: "employee" },
    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    companyLogo: {
      id: { type: String },
      url: { type: String },
    },

    website: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      requierd: true,
      trim: true,
    },

    about: {
      type: String,
    },

    savedCandidate: [
      {
        type: Schema.Types.ObjectId,
        ref: "Canidate",
      },
    ],

    noOfJobPost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ------------------------------
// 3. EXPORT MODEL (Avoids recompiling in Next.js)
// ------------------------------
export const Employee: Model<IEmployerProfile> =
  mongoose.models.Employee || mongoose.model<IEmployerProfile>("Employee", employerProfileSchema);
