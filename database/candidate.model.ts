import mongoose, { Schema, Document, Model } from "mongoose";

import { IJob } from "./job.model";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export interface IExperience {
  _id?: mongoose.Types.ObjectId;
  position: string;
  company: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string;
}

export interface IEducation {
  _id?: mongoose.Types.ObjectId;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear?: Date | null;
}

export interface IResume {
  id?: string;
  url?: string;
}
export interface IPhoto {
  id?: string;
  url?: string;
}

export interface ICandidateProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  gender: string;
  accountType?: "candidate" | "employee";
  headline?: string;
  location?: {
    country?: string;
    state?: string;
  };
  savedJob?: mongoose.Types.ObjectId[] | IJob[];
  dateOfBirth?: Date;
  bio?: string;
  resume?: IResume;
  photo?: IPhoto;
  skills: string[];
  languages?: string[];
  yearOfExperience?: string;
  experience: IExperience[];
  education: IEducation[];
  createdAt: Date;
  updatedAt: Date;
}

const candidateProfileSchema = new Schema<ICandidateProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String },
    photo: {
      id: { type: String },
      url: { type: String },
    },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date },
    accountType: { type: String, default: "candidate" },
    headline: { type: String, trim: true },
    location: {
      country: { type: String },
      state: { type: String },
    },
    bio: { type: String },

    resume: {
      id: { type: String },
      url: { type: String },
    },

    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    languages: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    savedJob: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    yearOfExperience: { type: String },
    experience: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        position: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    education: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        graduationYear: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

// ------------------------------
// 3. EXPORT MODEL (Avoid recompile issues in Next.js)
// ------------------------------
export const Candidate: Model<ICandidateProfile> =
  mongoose.models.Candidate || mongoose.model<ICandidateProfile>("Candidate", candidateProfileSchema);
