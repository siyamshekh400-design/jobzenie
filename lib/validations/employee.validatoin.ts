import z from "zod";

export const employeeFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).trim(),
  email: z.email({ message: "Please enter a valid email address." }).min(1, "Email is required").trim(),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }).trim(),
  companySize: z.string().min(2, { message: "company size is required" }).trim(),
  country: z.string().min(1, { message: "country is required" }).trim(),
  industry: z.string().min(1, { message: "Industry is required" }).trim(),
  about: z.string().min(20).trim(),
});

// Infer type from schema to ensure type safety in the form
export type EmployeeProfileFormValues = z.infer<typeof employeeFormSchema>;
