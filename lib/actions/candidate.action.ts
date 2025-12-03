"use server";

import { APIError } from "better-auth";
import mongoose, { FilterQuery, PipelineStage } from "mongoose";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { cache } from "react";
import z from "zod";

import { Application, IApplication } from "@/database/applicaton.model";
import { Candidate, ICandidateProfile, IExperience, IEducation } from "@/database/candidate.model";
import { IJob, Job } from "@/database/job.model";
import { auth } from "@/lib/auth";
import { CandidateDashboardStats, PaginationResponse, PaginatedSearchParams, RecentApplication } from "@/types/action";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { createCandidateProfileSchema, experienceSchema, educationSchema } from "../validations/candidate.validate";

export const createCandidateProfile = async (
  userId: string,
  accountType: string,
  params: z.infer<typeof createCandidateProfileSchema>
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  // 1. Validate input

  console.log(params);
  const validationResult = await action({
    params,
    schema: createCandidateProfileSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    // Extract fields from validated result
    const { name, email, phone, headline, gender, dateOfBirth, location, bio, yearOfExperience, languages } =
      validationResult.params!;

    // Ensure one user = one profile (optional if needed)
    const existing = await Candidate.findOne({ email });
    if (existing) {
      throw new Error("Candidate profile for this email already exists");
    }

    // 3. Create profile
    const [profile] = await Candidate.create([
      {
        user: userId,
        name,
        accountType,
        email,
        phone,
        headline,
        gender,
        yearOfExperience,
        dateOfBirth,
        location,
        languages,
        bio,
      },
    ]);

    if (!profile) throw new Error("Failed to create candidate profile");

    try {
      await auth.api.updateUser({
        body: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          candidate: (profile._id as any).toString(),
        },
        headers: await headers(),
      });

      return {
        success: true,
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
    }

    // 6. Return success
    return {
      success: true,
      data: {
        candidate: JSON.parse(JSON.stringify(profile)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateCandidateProfile = async (
  userId: string,
  params: z.infer<typeof createCandidateProfileSchema>
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: createCandidateProfileSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { name, phone, headline, gender, dateOfBirth, location, bio, yearOfExperience, languages } =
      validationResult.params!;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Update fields if they exist in params
    if (name !== undefined) profile.name = name;
    if (phone !== undefined) profile.phone = phone;
    if (headline !== undefined) profile.headline = headline;
    if (gender !== undefined) profile.gender = gender;
    if (bio !== undefined) profile.bio = bio;
    if (yearOfExperience !== undefined) profile.yearOfExperience = yearOfExperience;
    if (languages !== undefined) profile.languages = languages;

    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;

    if (location) {
      profile.location = {
        country: location.country ?? profile.location?.country,
        state: location.state ?? profile.location?.state,
      };
    }

    // 4. Save changes
    const updated = await profile.save();

    // 5. Revalidate UI page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        candidate: JSON.parse(JSON.stringify(updated)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const addExperienceToCandidateProfile = async (
  userId: string,
  params: z.infer<typeof experienceSchema>
): Promise<ActionResponse<{ experience: IExperience }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: experienceSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { position, company, startDate, endDate, description } = params;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Build new experience object
    const newExperience = {
      _id: new mongoose.Types.ObjectId(),
      position,
      company,
      startDate,
      endDate,
      description,
    };

    // 4. Push experience into array
    profile.experience.push(newExperience);

    // 5. Save the profile
    await profile.save();

    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        experience: JSON.parse(JSON.stringify(newExperience)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateExperienceInCandidateProfile = async (
  userId: string,
  experienceId: string,
  params: Partial<z.infer<typeof experienceSchema>>
): Promise<ActionResponse<{ experience: IExperience }>> => {
  // 1️⃣ Validate input
  const validationResult = await action({
    params,
    schema: experienceSchema.partial(), // allow partial updates
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    // 2️⃣ Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3️⃣ Find the experience to update
    const experience = profile.experience.find((e) => String(e._id) === experienceId);
    if (!experience) {
      throw new Error("Experience not found");
    }

    // 4️⃣ Update fields
    if (params.position !== undefined) experience.position = params.position;
    if (params.company !== undefined) experience.company = params.company;
    if (params.startDate !== undefined) experience.startDate = params.startDate;
    if (params.endDate !== undefined) experience.endDate = params.endDate;
    if (params.description !== undefined) experience.description = params.description;

    await profile.save();

    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        experience: JSON.parse(JSON.stringify(experience)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getCandidateProfileByUserId = async (
  userId: string
): Promise<
  ActionResponse<{
    candidate: ICandidateProfile;
    stats: {
      totalApplications: number;
      savedJobsCount: number;
      profileStrength: number;
    };
  }>
> => {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // 1. Find profile
    const profile = await Candidate.findOne({ user: userId }).lean();

    if (!profile) {
      throw new Error("Candidate profile not found");
    }
    const totalApplications = await Application.countDocuments({
      candidate: profile._id,
    });

    // 4. Saved Jobs Count
    const savedJobsCount = profile.savedJob?.length || 0;

    // 5. Profile Strength Calculation (Smart Logic)
    let completedFields = 0;
    const totalFields = 10;

    if (profile.name) completedFields++;
    if (profile.email) completedFields++;
    if (profile.phone) completedFields++;
    if (profile.photo?.url) completedFields++;
    if (profile.bio) completedFields++;
    if (profile.headline) completedFields++;
    if (profile.skills?.length) completedFields++;
    if (profile.languages?.length) completedFields++;
    if (profile.experience?.length) completedFields++;
    if (profile.education?.length) completedFields++;
    if (profile.resume?.url) completedFields++;

    const profileStrength = Math.round((completedFields / totalFields) * 100);

    // 2. Return
    return {
      success: true,
      data: {
        candidate: JSON.parse(JSON.stringify(profile)),
        stats: {
          profileStrength,
          savedJobsCount,
          totalApplications,
        },
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const deleteExperienceFromCandidateProfile = async (
  userId: string,
  experienceId: string
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // 1. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 2. Find experience index
    const index = profile.experience.findIndex((e) => String(e._id) === experienceId);

    if (index === -1) {
      throw new Error("Experience entry not found");
    }

    // 3. Remove experience from array
    profile.experience.splice(index, 1);

    // 4. Save changes
    await profile.save();

    // 5. Revalidate UI path
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const addEducationToCandidateProfile = async (
  userId: string,
  params: z.infer<typeof educationSchema>
): Promise<ActionResponse<{ education: IEducation }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: educationSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { institution, degree, fieldOfStudy, graduationYear } = validationResult.params!;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Build new education object
    const newEducation = {
      _id: new mongoose.Types.ObjectId(),
      institution,
      degree,
      fieldOfStudy,
      graduationYear,
    };

    // 4. Push education into array
    profile.education.push(newEducation);

    // 5. Save the profile
    await profile.save();

    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        education: JSON.parse(JSON.stringify(newEducation)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateEducationInCandidateProfile = async (
  userId: string,
  educationId: string,
  params: z.infer<typeof educationSchema>
): Promise<ActionResponse<{ education: IEducation }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: educationSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { institution, degree, fieldOfStudy, graduationYear } = validationResult.params!;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Find education by _id
    const education = profile.education.find((e) => String(e._id) === educationId);

    if (!education) {
      throw new Error("Education entry not found");
    }

    // 4. Update fields
    education.institution = institution ?? education.institution;
    education.degree = degree ?? education.degree;
    education.fieldOfStudy = fieldOfStudy ?? education.fieldOfStudy;
    education.graduationYear = graduationYear ?? education.graduationYear;

    // 5. Save profile
    await profile.save();

    revalidatePath("/dashboard/candidate/profile");
    return {
      success: true,
      data: {
        education: JSON.parse(JSON.stringify(education)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const deleteEducationFromCandidateProfile = async (
  userId: string,
  educationId: string
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // 1. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 2. Find education index
    const index = profile.education.findIndex((e) => String(e._id) === educationId);

    if (index === -1) {
      throw new Error("Education entry not found");
    }

    // 3. Remove education from array
    profile.education.splice(index, 1);

    // 4. Save changes
    await profile.save();

    // 5. Revalidate UI path
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

// Server action: update candidate resume/image information
export const candidateImageUpload = async (
  userId: string,
  payload: { id?: string; url?: string }
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    console.log(payload);

    if (!payload?.url) {
      throw new Error("Image URL is required");
    }
    const candidate = await Candidate.findOne({ user: userId });
    if (!candidate) {
      throw new Error("Candidate profile not found");
    }

    // Update photo atomically
    const updatedProfile = await Candidate.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          photo: {
            id: payload.id ?? candidate.photo?.id ?? "",
            url: payload.url ?? candidate.photo?.url ?? "",
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedProfile) {
      throw new Error("Candidate profile not found");
    }

    console.log(updatedProfile);

    // Update better-auth user profile image
    try {
      if (updatedProfile?.photo?.url as string) {
        await auth.api.updateUser({
          body: {
            image: payload.url as string,
          },
          headers: await headers(),
        });

        return {
          success: true,
        };
      }
    } catch (error) {
      console.log("🚀 ~ candidateImageUplaod ~ error:", error);
      if (error instanceof APIError) {
        return {
          success: false,
          status: error.statusCode,
          error: {
            message: error.message,
          },
        };
      }
    }

    // Revalidate page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ candidateImageUplaod ~ error:", error);
    return handleError(error) as ErrorResponse;
  }
};

export const candidateResumeUplaod = async (
  userId: string,
  payload: { id?: string; url?: string }
): Promise<ActionResponse> => {
  try {
    await dbConnect();
    if (!payload?.url) {
      throw new Error("Image URL is required");
    }

    // Update resume atomically
    const updatedProfile = await Candidate.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          resume: {
            id: payload.id,
            url: payload.url,
          },
        },
      },
      {
        new: true, // return updated data
        runValidators: true,
      }
    ).lean();

    if (!updatedProfile) {
      throw new Error("Candidate profile not found");
    }

    // Revalidate page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const candidateSkillsUpload = async (userId: string, payload: string[]): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // Update resume atomically
    const updatedProfile = await Candidate.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          skills: payload,
        },
      },
      {
        new: true, // return updated data
        runValidators: true,
      }
    ).lean();

    if (!updatedProfile) {
      throw new Error("Candidate profile not found");
    }

    // Revalidate page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getAllCandidates = cache(
  async (
    query: PaginatedSearchParams
  ): Promise<ActionResponse<{ candidates: ICandidateProfile[]; pagination: PaginationResponse }>> => {
    try {
      await dbConnect();

      const { search = "", country = "", skill = "", page = 1, limit = 10, experience } = query;

      // Build MongoDB Filter
      const filter: FilterQuery<ICandidateProfile> = {};

      // Search by name OR headline
      if (search) {
        filter.$or = [{ name: { $regex: search, $options: "i" } }, { headline: { $regex: search, $options: "i" } }];
      }
      // Filter by experience
      if (experience) {
        filter.yearOfExperience = { $regex: experience, $options: "i" };
      }

      // Filter by country
      if (country) {
        filter["location.country"] = { $regex: country, $options: "i" };
      }

      // Filter by skills
      if (skill) {
        const tag: string = skill.toLowerCase().trim();
        filter.skills = { $in: [tag] };
      }

      const skip = (page - 1) * limit;

      // Exclude sensitive fields
      const projection = {
        email: 0,
        phone: 0,
        // resume: 0,
        updatedAt: 0,
        __v: 0,
      };

      // Prioritized Sorting
      const sortPriority: Record<string, 1 | -1> = {
        hasResume: -1, // 1st priority
        hasSkills: -1, // 2nd priority
        createdAt: -1, // latest first
      };

      // Aggregation Pipeline for Priorit
      const pipeline: PipelineStage[] = [
        { $match: filter },

        // Add priority fields
        {
          $addFields: {
            hasResume: {
              $cond: [{ $gt: ["$resume.url", null] }, 1, 0],
            },
            hasSkills: {
              $cond: [{ $gt: [{ $size: "$skills" }, 0] }, 1, 0],
            },
          },
        },

        // Remove sensitive fields
        { $project: projection },

        // Sort by priority
        { $sort: sortPriority },

        // Pagination
        { $skip: skip },
        { $limit: limit },
      ];

      const candidates = (await Candidate.aggregate(pipeline).exec()) as ICandidateProfile[];
      const total = await Candidate.countDocuments(filter);
      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          candidates,
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
  }
);

export const getCandidateById = async (
  candidateId: string | mongoose.Types.ObjectId
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  try {
    await dbConnect();

    if (!candidateId) {
      throw new Error("Candidate ID is required");
    }

    // Exclude sensitive fields like email, phone, etc.
    const projection = {
      email: 0,
      phone: 0,
      updatedAt: 0,
      __v: 0,
    };

    const candidate = await Candidate.findById(candidateId, projection).lean<ICandidateProfile | null>();

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    return {
      success: true,
      data: { candidate },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

// Save job

// save candidates
export async function addToSaveJob(candidateId: string, jobiId: string): Promise<ActionResponse> {
  if (!candidateId || typeof candidateId !== "string" || candidateId.trim() === "") {
    throw new Error("Unauthorized: Please log in as a candidate to save jobs.");
  }

  const validationResult = await action({
    params: { jobiId, candidateId },
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new Error("candidate not found");
    }

    const job = await Job.findById(jobiId);
    if (!job) {
      throw new Error("Job not found");
    }

    const alreadyInSaveJob = candidate.savedJob?.some((id) => id.toString() === jobiId);

    if (alreadyInSaveJob) {
      throw new Error("Job already in saved list");
    }

    // Add candidate to employee's savedCandidate list if not already there
    await Candidate.findByIdAndUpdate(candidateId, { $addToSet: { savedJob: jobiId } }, { new: true });

    revalidatePath("/dashboard/candidate");
    revalidatePath("/dashboard/candidate/saved-jobs");
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function removeFromSavedJob(candidateId: string, jobId: string): Promise<ActionResponse> {
  const validationResult = await action({
    params: { jobId, candidateId },
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    console.log({ candidateId, jobId });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new Error("Candidate not found");
    }

    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    const isSaved = candidate.savedJob?.some((id) => id.toString() === jobId);

    if (!isSaved) {
      throw new Error("Job is not in saved list");
    }

    // Remove job from savedJob using $pull
    await Candidate.findByIdAndUpdate(candidateId, { $pull: { savedJob: jobId } }, { new: true });

    revalidatePath("/dashboard/candidate");
    revalidatePath("/dashboard/candidate/saved-jobs");

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getSavedJobsCandidateId(candidateId: string): Promise<ActionResponse<{ jobs: IJob[] }>> {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    // Find the employee and populate savedCandidate with selected fields
    const candidate = (await Candidate.findById(candidateId).populate({
      path: "savedJob",
      model: Job,
      select: "title companyName location salary jobType skillsRequired  _id",
    })) as ICandidateProfile | null;

    if (!candidate) {
      throw new Error('"candidate not found"');
    }

    const savedJobs = candidate.savedJob as IJob[];

    return {
      success: true,
      data: {
        jobs: JSON.parse(JSON.stringify(savedJobs)) || [],
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export const getSingleCandidateStats = async (
  candidateId: string
): Promise<ActionResponse<CandidateDashboardStats>> => {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // 1. Get Candidate Profile
    const candidate = await Candidate.findById(candidateId).lean();
    if (!candidate) throw new Error("Candidate not found");

    // 2. Total Applications
    const totalApplications = await Application.countDocuments({
      candidate: candidateId,
    });

    // 3. Applications By Status
    const statusAggregation = await Application.aggregate([
      { $match: { candidate: new mongoose.Types.ObjectId(candidateId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const applicationStatusBreakdown = {
      submitted: 0,
      reviewed: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
      withdrawn: 0,
    };

    statusAggregation.forEach((item) => {
      applicationStatusBreakdown[item._id as keyof typeof applicationStatusBreakdown] = item.count;
    });

    // 4. Saved Jobs Count
    const savedJobsCount = candidate.savedJob?.length || 0;

    // 5. Profile Strength Calculation (Smart Logic)
    let completedFields = 0;
    const totalFields = 10;

    if (candidate.name) completedFields++;
    if (candidate.email) completedFields++;
    if (candidate.phone) completedFields++;
    if (candidate.photo?.url) completedFields++;
    if (candidate.bio) completedFields++;
    if (candidate.headline) completedFields++;
    if (candidate.skills?.length) completedFields++;
    if (candidate.languages?.length) completedFields++;
    if (candidate.experience?.length) completedFields++;
    if (candidate.education?.length) completedFields++;
    if (candidate.resume?.url) completedFields++;

    const profileStrength = Math.round((completedFields / totalFields) * 100);

    // 6. Recent Applications (Last 5)
    const recentApplications = (await Application.find({
      candidate: candidateId,
    })
      .populate("job", "title companyName location _id")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()) as unknown as RecentApplication[];

    // ✅ Final Response
    return {
      success: true,
      message: "Candidate dashboard stats loaded successfully",
      data: JSON.parse(
        JSON.stringify({
          totalApplications,
          applicationStatusBreakdown,
          savedJobsCount,
          profileStrength,
          recentApplications,
        })
      ),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
