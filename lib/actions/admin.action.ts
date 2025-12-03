"use server";

import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { Application } from "@/database/applicaton.model";
import { Candidate } from "@/database/candidate.model";
import { Employee } from "@/database/employee.model";
import { Job } from "@/database/job.model";
import { auth, User } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import {
  adminUserCreateSchema,
  AdminUserCreateValues,
  adminUserUpdateSchema,
  AdminUserUpdateValues,
} from "../validations/admin.validate";

// -----------------------------
// Create New User
// -----------------------------
export async function createNewUser(params: AdminUserCreateValues): Promise<ActionResponse<{ user: User }>> {
  const validationResult = await action({
    role: "admin",
    params,
    schema: adminUserCreateSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, email, password, role, accountType } = validationResult.params!;
  try {
    const newUser = await auth.api.createUser({
      body: {
        email,
        password,
        name,
        role,
        data: {
          accountType,
          role,
        },
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User created successfully",
      data: {
        user: JSON.parse(JSON.stringify(newUser)),
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}

// -----------------------------
// Update User by ID
// -----------------------------
export async function updateUserById(
  userId: string,
  data: Partial<AdminUserUpdateValues>
): Promise<ActionResponse<{ user: User }>> {
  const validationResult = await action({
    role: "admin",
    params: data,
    schema: adminUserUpdateSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const updatedUser = await auth.api.adminUpdateUser({
      body: { userId, data: { ...data } },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User updated successfully",
      data: {
        user: JSON.parse(JSON.stringify(updatedUser)),
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message || `${error.statusCode} Error: ${error.status || ""}`,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}

// -----------------------------
// Delete User
// -----------------------------
export async function deleteUserByAdmin(userId: string): Promise<ActionResponse> {
  const validationResult = await action({
    role: "admin",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message || `${error.statusCode} Error: ${error.status || ""}`,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}

// -----------------------------
// Get All Users
// -----------------------------
export async function getAllUsers(): Promise<ActionResponse<{ users: User[] }>> {
  const validationResult = await action({
    role: "admin",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const data = await auth.api.listUsers({
      headers: await headers(),
      query: {
        limit: 10000,
      },
    });

    return {
      success: true,
      message: "Users fetched successfully",
      data: {
        users: JSON.parse(JSON.stringify(data.users)),
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}

// -----------------------------
// Make User Admin
// -----------------------------
export async function makeUserAdmin(userId: string, role: "user" | "admin" = "admin") {
  try {
    const result = await auth.api.setRole({
      body: { userId, role },
      headers: await headers(),
    });
    return result;
  } catch (err) {
    console.error("Error setting user role:", err);
    throw err;
  }
}

export async function updateUserPassword(userId: string, password: string): Promise<ActionResponse<{ user: User }>> {
  const validationResult = await action({
    role: "admin",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const updatedUser = await auth.api.setUserPassword({
      body: {
        userId,
        newPassword: password,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      success: true,
      message: "Password updated successfully",
      data: {
        user: JSON.parse(JSON.stringify(updatedUser)),
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message || `${error.statusCode} Error: ${error.status || ""}`,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}

interface JobStatusCount {
  _id: "open" | "closed" | "filled";
  count: number;
}

interface ApplicationStatusCount {
  _id: "submitted" | "reviewed" | "interviewing" | "offered" | "rejected" | "withdrawn";
  count: number;
}

interface TopJob {
  jobId: string;
  title: string;
  applicationsCount: number;
}

export interface AdminDashboardStats {
  totalCandidates: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
  jobsByStatus: JobStatusCount[];
  applicationsByStatus: ApplicationStatusCount[];
  topJobs: TopJob[];
}

export async function getAdminDashboardStats(): Promise<ActionResponse<AdminDashboardStats>> {
  try {
    await dbConnect();
    // Total counts
    const totalCandidates = await Candidate.countDocuments();
    const totalEmployers = await Employee.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Jobs by status
    const jobsByStatus: JobStatusCount[] = await Job.aggregate<JobStatusCount>([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Applications by status
    const applicationsByStatus: ApplicationStatusCount[] = await Application.aggregate<ApplicationStatusCount>([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Top 5 most applied jobs
    const topJobs: TopJob[] = await Application.aggregate<TopJob>([
      {
        $group: {
          _id: "$job",
          applicationsCount: { $sum: 1 },
        },
      },
      { $sort: { applicationsCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      {
        $project: {
          _id: 0,
          jobId: "$job._id",
          title: "$job.title",
          applicationsCount: 1,
        },
      },
    ]);

    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({
          totalCandidates,
          totalEmployers,
          totalJobs,
          totalApplications,
          jobsByStatus,
          applicationsByStatus,
          topJobs,
        })
      ),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

// Todo: Admin manage applications
// Todo: Admin: Get all pending applications for review
export async function getAdminPendingApplications() {
  try {
    await dbConnect();

    const applications = await Application.find({
      "adminReview.status": "pending",
    })
      .populate("job", "title companyName companyLogo")
      .populate("candidate", "name email phone resume skills")
      .sort({ createdAt: -1 })
      .lean();

    const total = await Application.countDocuments({
      "adminReview.status": "pending",
    });

    return {
      success: true,
      data: {
        applications: JSON.parse(JSON.stringify(applications)),
        total,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
