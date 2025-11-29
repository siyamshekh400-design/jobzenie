import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    accountType: z.enum(["candidate", "employee"]),
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

    confirmPassword: z.string(),

    agreeOnTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const createPasswordSchema = (withCurrentPassword?: boolean) =>
  z
    .object({
      currentPassword: withCurrentPassword
        ? z
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
            })
        : z.string().optional(),

      newPassword: z
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

      confirmPassword: z.string().min(8, "Confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export type PasswordFormValues = z.infer<ReturnType<typeof createPasswordSchema>>;
