"use client";

import { error } from "console";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";

// ⬇️ Validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Please enter your current password.",
  }),
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

export function PasswordForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      const { error } = await authClient.changePassword({
        newPassword: values.newPassword, // required
        currentPassword: values.currentPassword, // required
        revokeOtherSessions: true,
      });
      if (error) {
        return toast.error(error.message);
      }
      toast.success("Password Updated");
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message || "Fail to rest password");
      } else {
        // fallback for unknown errors
        toast.error("Failed to reset password");
      }
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Change Password</CardTitle>
        <CardDescription>Enter your current password and a new password.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pb-6">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Current Password" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </CardContent>

          {/* Separator */}
          <div className="px-6">
            <div className="border-border border-t" />
          </div>

          <CardFooter className="flex flex-col items-start justify-between gap-4 pt-4 pb-4 sm:flex-row sm:items-center">
            <p className="text-muted-foreground text-sm">Please use 8 characters at minimum.</p>
            <Button disabled={isSubmitting} type="submit" variant="secondary" className="w-full sm:w-auto">
              {isSubmitting ? "saving..." : "save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
