import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  accountType?: string;
  role?: string;
  agreeOnTerms?: boolean;
  // Reference IDs
  employee?: Types.ObjectId;
  candidate?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
    },

    // Additional properties
    agreeOnTerms: {
      type: Boolean,
      required: true,
    },

    accountType: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },

    candidate: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: false,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in development
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
