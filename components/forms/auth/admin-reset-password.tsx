"use client";

import { error } from "console";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { updateUserPassword } from "@/lib/actions/admin.action";
import { authClient } from "@/lib/auth-client";

// ⬇️ Validation schema
const passwordSchema = z.object({
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
});

export default function AdminResetPasswordForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      const { success, message, error } = await updateUserPassword(userId, values.newPassword);
      if (success) {
        form.reset();
        return toast.success(message);
      } else {
        form.reset();
        return toast.error(error?.message || "Fail to reset password");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message || "Fail to reset password");
      } else {
        // fallback for unknown errors
        toast.error("Failed to reset password");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password with Toggle */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit" variant="secondary" className="flex-1">
          {isSubmitting ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
