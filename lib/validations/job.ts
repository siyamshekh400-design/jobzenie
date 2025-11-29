import { z } from "zod";

export const jobFormSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  salary: z
    .object({
      min: z
        .number()
        .min(0, "Min salary must be at least 0")
        .max(999999, "Min salary must be less than 1,000,000")
        .refine((data) => Number(data)),
      max: z.number().min(0, "Max salary must be at least 0").max(999999, "Max salary must be less than 1,000,000"),
    })
    .refine((data) => data.max === null || data.min === null || data.max >= data.min, {
      message: "Max salary must be greater than or equal to min salary",
      path: ["max"],
    }),
  jobType: z.string().min(1, "Job type is required"),
  yearOfExperieence: z.string().min(1, "Experience in requiere"),
  skillLelvel: z.string().min(1, "Skill level in requiere"),
  skillsRequired: z.array(z.string()).min(1, { message: "Please select at least one skill." }),
  benefits: z.array(z.string()).optional(),
  description: z
    .string()
    .min(1, "Job description is required")
    .min(20, "Job description must be at least 20 characters")
    .max(2000, "Job description must be less than 2000 characters"),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
