"use client";

import { useState } from "react";
import { toast } from "sonner";

import EmailVerifyForm from "@/components/forms/auth/email-verify-form";
import { sendPasswordResetEmail } from "@/lib/actions/auth.action";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async ({ email }: { email: string }) => {
    setLoading(true);

    // console.log("Send password reset to:", email);

    const { success, error, message } = await sendPasswordResetEmail(email, "/auth/reset-password");
    if (success) {
      toast.success(message);
      setSuccess(true);
      setLoading(false);
    } else {
      toast.error(error?.message || "Failed to send verification email.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="bg-background w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-lg">
        <h1 className="text-xl font-semibold">Forgot Password</h1>
        <p className="text-muted-foreground text-sm">Enter your email to receive a password reset link.</p>

        <EmailVerifyForm
          label="Email Address"
          buttonText="Send Reset Link"
          loading={loading}
          onSubmit={handleForgotPassword}
        />

        {success && <p className="text-center text-sm text-green-600">Password reset link sent successfully ✅</p>}
      </div>
    </div>
  );
}
