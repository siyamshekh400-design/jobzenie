"use server";

import { Application, IApplication } from "@/database/applicaton.model";
import { Candidate, ICandidateProfile } from "@/database/candidate.model";
import { IJob, Job } from "@/database/job.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

// for candidate
export async function applyToJob(candidateId: string, jobId: string): Promise<ActionResponse> {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Validate candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new Error("Candidate not found");
    if (!candidate.resume?.url) throw new Error("Candidate has no uploaded resume");
    // Validate job
    const job = await Job.findById(jobId);
    if (!job) throw new Error("Job not found");

    // Check if already applied
    const existingApplication = await Application.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (existingApplication) throw new Error("You have already applied for this job");

    await Application.create({
      candidate: candidateId,
      job: jobId,
      resumeSnapshot: candidate.resume.url,
    });

    // update countApplicatons in job model using inc operation
    await Job.findByIdAndUpdate(jobId, { $inc: { countApplicatons: 1 } });

    return {
      success: true,
      message: "Application submitted successfully",
    };
  } catch (error) {
    console.error("Error applying to job:", error);
    return handleError(error) as ErrorResponse;
  }
}
//for candidate
export async function getAppliedJobs(candidateId: string): Promise<ActionResponse<{ applications: IApplication[] }>> {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    const applications = await Application.find({ candidate: candidateId })
      .populate({
        path: "job",
        model: Job,
        select: "title companyName location salary jobType skillsRequired _id adminReview",
      })
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: {
        applications: JSON.parse(JSON.stringify(applications)),
      },
    };
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return handleError(error) as ErrorResponse;
  }
}

// for employee
// get all applicants informarion by candidate Id

export async function getCandidatesForJob(jobId: string): Promise<ActionResponse<{ candidates: ICandidateProfile[] }>> {
  try {
    await dbConnect();

    // Fetch all applications for the job and populate candidate profile
    const applications = await Application.find({ job: jobId })
      .populate({
        path: "candidate",
        model: Candidate,
        select: "name email phone yearOfExperience _id skills",
      })
      .populate({
        path: "job",
        model: Job,
        select: "_id title companyName",
      })
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return {
        success: true,
        data: {
          candidates: [],
        },
      };
    }

    // Map to return candidate info + application info
    const candidates = applications
      .filter((app) => app.candidate)
      .map((app) => {
        const job = app.job as IJob;
        return {
          candidate: app.candidate,
          status: app.status,
          resumeSnapshot: app.resumeSnapshot,
          appliedAt: app.createdAt,
          job: {
            _id: String(job._id),
            title: job.title,
            companyName: job.companyName,
          },
        };
      });

    return {
      success: true,
      data: {
        candidates: JSON.parse(JSON.stringify(candidates)),
      },
    };
  } catch (error) {
    console.error("Error fetching candidates for job:", error);
    return handleError(error) as ErrorResponse;
  }
}
