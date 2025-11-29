import z from "zod";

export const createCandidateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().optional(),
  phone: z.string(),
  headline: z.string().min(1, "Headline is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.date().optional(),
  yearOfExperience: z.string().min(1, "Year of experience is required"),
  location: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
  }),
  languages: z.array(z.string()).min(1, { message: "Please select at least one language." }),
  bio: z.string().min(1, "Bio is required"),
});

export const updateCandidateProfileSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().optional(),
    phone: z.string(),
    headline: z.string().min(1, "Headline is required"),
    gender: z.string().min(1, "Gender is required"),
    dateOfBirth: z.date().optional(),
    location: z.object({
      country: z.string().min(1, "Country is required"),
      state: z.string().optional(),
    }),
    bio: z.string().min(1, "Bio is required"),
  })
  .optional();

export const deleteCandidateProfileSchema = z.object({
  id: z.string().min(1, "Candidate profile ID is required"),
});

// Experience Schema

export const experienceSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.date({
    error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
  }),
  endDate: z
    .date({
      error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
    })
    .optional(),
  description: z.string().optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  institution: z.string().min(1, "institution/University is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  graduationYear: z.date({
    error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
  }),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
