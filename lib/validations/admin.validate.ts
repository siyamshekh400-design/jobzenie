import z from "zod";

// Zod schema for validation
export const adminUserCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email(),
  password: z
    .string()
    .refine((val) => /.{8,}/.test(val), {
      message: "At least 8 characters",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "At least 1 number",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "At least 1 lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "At least 1 uppercase letter",
    }),
  role: z.enum(["admin", "user"]),
  accountType: z.enum(["candidate", "employee"]),
});

export const adminUserUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email().optional(),
  role: z.string().optional(),
  accountType: z.string().optional(),
});

export type AdminUserUpdateValues = z.infer<typeof adminUserUpdateSchema>;

export type AdminUserCreateValues = z.infer<typeof adminUserCreateSchema>;
