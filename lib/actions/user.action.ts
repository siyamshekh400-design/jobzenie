"use server";

import { headers } from "next/headers";

import { Application } from "@/database/applicaton.model";
import { Candidate } from "@/database/candidate.model";
import { Employee } from "@/database/employee.model";
import { Job } from "@/database/job.model";
import { User } from "@/database/user.model";

import { auth } from "../auth";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export const deleteAccount = async (userId: string, password: string): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // 1. Fetch user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Verify password (Clerk/Auth/Lucia - adapt to your system)
    try {
      await auth.api.deleteUser({
        body: { password },
        headers: await headers(),
      });
    } catch (err) {
      throw new Error("Incorrect password");
    }

    // -----------------------------
    // 3. Delete Candidate Account
    // -----------------------------
    if (user.accountType === "candidate") {
      const candidateProfile = await Candidate.findById(user.candidate);

      if (candidateProfile) {
        // Delete candidate resume/photo from Cloudinary if exists
        if (candidateProfile.photo?.id) {
          //   await deleteFromCloudinary(candidateProfile.photo.id);
        }
        if (candidateProfile.resume?.id) {
          //   await deleteFromCloudinary(candidateProfile.resume.id);
        }

        // Delete all applications by this candidate
        await Application.deleteMany({ candidate: candidateProfile._id });

        // Remove candidate from employer.savedCandidate
        await Employee.updateMany(
          { savedCandidate: candidateProfile._id },
          { $pull: { savedCandidate: candidateProfile._id } }
        );

        // Remove candidate from any job's application list
        await Job.updateMany({ applications: candidateProfile._id }, { $pull: { applications: candidateProfile._id } });

        // Finally delete profile
        await Candidate.findByIdAndDelete(candidateProfile._id);
      }
    }

    // -----------------------------
    // 4. Delete Employer Account
    // -----------------------------
    if (user.accountType === "employee") {
      const employerProfile = await Employee.findById(user.employee);

      if (employerProfile) {
        // Delete companyLogo
        if (employerProfile.companyLogo?.id) {
          //   await deleteFromCloudinary(employerProfile.companyLogo.id);
        }

        // Get jobs posted by employer
        const jobs = await Job.find({ employer: employerProfile._id });

        for (const job of jobs) {
          // Delete all applications related to this job
          await Application.deleteMany({ job: job._id });

          // Remove job from candidate.savedJob
          await Candidate.updateMany({ savedJob: job._id }, { $pull: { savedJob: job._id } });
        }

        // Delete all jobs
        await Job.deleteMany({ employer: employerProfile._id });

        // Delete employer profile
        await Employee.findByIdAndDelete(employerProfile._id);
      }
    }

    // -----------------------------
    // 5. Finally delete User record
    // -----------------------------
    await User.findByIdAndDelete(userId);

    // -----------------------------
    // 6. Sign out all sessions
    // -----------------------------
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      //   message: "Account deleted successfully",
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
