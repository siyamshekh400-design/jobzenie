"use server";
import { FilterQuery, PipelineStage } from "mongoose";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { cache } from "react";

import { Employee } from "@/database/employee.model";
import { IJob, Job } from "@/database/job.model";
import { PaginatedSearchParams, PaginationResponse } from "@/types/action";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { jobFormSchema, JobFormValues } from "../validations/job";

export const createNewJob = async (
  employeeId: mongoose.Types.ObjectId | string,
  payload: JobFormValues
): Promise<ActionResponse<{ job: IJob }>> => {
  // Validate payload
  const validationResult = await action({
    params: payload,
    schema: jobFormSchema,
    authorizeRole: "employee",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { title, description, location, jobType, skillLelvel, yearOfExperieence, salary, skillsRequired, benefits } =
      validationResult.params!;

    // Ensure employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee profile not found");

    // Create job
    const [job] = await Job.create([
      {
        employer: employee._id,
        title,
        description,
        location,
        jobType,
        skillLelvel,
        yearOfExperieence,
        salary,
        skillsRequired,
        benefits,
        companyName: employee.companyName,
        companyLogo: employee.companyLogo ?? undefined,
        aboutCompany: employee.about ?? undefined,
      },
    ]);

    if (!job) throw new Error("Failed to create Job posting");

    // update noOfJobPost in Employee profile use findByIdAndUpdate use incment operator
    await Employee.findByIdAndUpdate(employee._id, { $inc: { noOfJobPost: 1 } });

    revalidatePath(`/dashboard/employee/jobs`);

    return {
      success: true,
      data: {
        job: JSON.parse(JSON.stringify(job)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateExistingJobById = async (
  jobId: mongoose.Types.ObjectId | string,
  payload: Partial<JobFormValues>
): Promise<ActionResponse<{ job: IJob }>> => {
  try {
    await dbConnect();

    // Ensure employee exists
    const validationResult = await action({
      params: payload,
      schema: jobFormSchema,
      authorizeRole: "employee",
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const updatedData = validationResult.params!;

    const job = await Job.findByIdAndUpdate(jobId, updatedData, {
      new: true,
    });
    if (!job) throw new Error("Job not found or failed to update");
    revalidatePath(`/dashboard/employee/jobs/edit/${jobId}`);
    revalidatePath(`/dashboard/employee/jobs`);
    return {
      success: true,
      data: {
        job: JSON.parse(JSON.stringify(job)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const deleteJob = async (jobId: string): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // Authorize employee role only
    const validationResult = await action({
      authorizeRole: "employee",
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const job = await Job.findById(jobId);
    if (!job) throw new Error("Job not found");

    await Job.findByIdAndDelete(jobId);

    await Employee.findByIdAndUpdate(job.employer, { $inc: { noOfJobPost: -1 } });

    revalidatePath(`/dashboard/employee/jobs`);
    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getAllJobs = async (
  query: PaginatedSearchParams
): Promise<ActionResponse<{ jobs: IJob[]; pagination: PaginationResponse }>> => {
  try {
    await dbConnect();

    const { search = "", location = "", jobType = "", skill = "", page = 1, limit = 10 } = query;

    const filter: FilterQuery<IJob> = {};

    // Full-text search — title, description, skills
    if (search) {
      filter.$text = { $search: search };
    }

    // Filter by location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Filter by job type
    if (jobType) {
      filter.jobType = jobType;
    }

    // Filter by required skills
    if (skill) {
      filter.skillsRequired = { $in: [skill.toLowerCase().trim()] };
    }

    const skip = (page - 1) * limit;

    // Exclude fields
    const projection = {
      __v: 0,
      updatedAt: 0,
    };

    // Priority Sorting:
    const sortPriority: Record<string, 1 | -1> = {
      countApplicatons: -1, // most popular first
      createdAt: -1, // newest jobs first
    };

    const pipeline: PipelineStage[] = [
      { $match: filter },

      {
        $addFields: {
          hasApplicants: {
            $cond: [{ $gt: ["$countApplicatons", 0] }, 1, 0],
          },
        },
      },

      { $project: projection },

      { $sort: sortPriority },

      { $skip: skip },
      { $limit: limit },
    ];

    const jobs = (await Job.aggregate(pipeline).exec()) as IJob[];

    const total = await Job.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        jobs: JSON.parse(JSON.stringify(jobs)),
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
    };
  } catch (error) {
    console.log("🚀 ~ getAllJobs ~ error:", error);
    return handleError(error) as ErrorResponse;
  }
};

export const getJobsByEmployeeId = async (
  employeeId: string,
  query: PaginatedSearchParams
): Promise<ActionResponse<{ jobs: IJob[]; pagination: PaginationResponse }>> => {
  try {
    await dbConnect();

    const { search = "", status = "", page = 1, limit = 10 } = query;

    const filter: FilterQuery<IJob> = {
      employer: new Types.ObjectId(employeeId),
      "adminReview.status": "approved",
    };

    // Optional search
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    }

    // Filter by status: "open" | "closed" | "filled"
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const projection = {
      __v: 0,
      updatedAt: 0,
    };

    const sortPriority: Record<string, 1 | -1> = {
      "adminReview.reviewedAt": -1,
      createdAt: -1, // latest job first
    };

    const pipeline: PipelineStage[] = [
      { $match: filter },

      {
        $addFields: {
          hasApplicants: {
            $cond: [{ $gt: ["$countApplicatons", 0] }, 1, 0],
          },
        },
      },

      { $project: projection },

      { $sort: sortPriority },

      { $skip: skip },
      { $limit: limit },
    ];

    const jobs = (await Job.aggregate(pipeline).exec()) as IJob[];

    const total = await Job.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        jobs: JSON.parse(JSON.stringify(jobs)),
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getJobById = cache(async (jobId: string): Promise<ActionResponse<{ job: IJob }>> => {
  try {
    await dbConnect();

    if (!jobId) throw new Error("Job ID is required");

    const projection = {
      __v: 0,
      updatedAt: 0,
    };

    const job = await Job.findById(jobId).select(projection).lean();

    if (!job) {
      return {
        success: false,
        status: 404,
        error: { message: "Job not found" },
      };
    }

    return {
      success: true,
      data: {
        job: JSON.parse(JSON.stringify(job)),
      },
    };
  } catch (error) {
    console.log("🚀 ~ getJobById ~ error:", error);
    return handleError(error) as ErrorResponse;
  }
});
