"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import EmailVerifyForm from "@/components/forms/auth/email-verify-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { sendVerificationEmail } from "@/lib/actions/auth.action";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResend = async ({ email }: { email: string }) => {
    setLoading(true);
    setSuccess(false);

    // console.log("Resend verification to:", email);
    const { success, error, message } = await sendVerificationEmail(email, "/onboarding/profile");
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
        {/* ✅ Alert */}
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertTitle className="text-lg font-semibold">Verify Your Email</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            An email has been sent to your inbox. Please verify yourself to continue.
          </AlertDescription>
        </Alert>

        {/* ✅ Reusable Email Form */}
        <EmailVerifyForm
          label="Didn't receive the email?"
          buttonText="Resend Verification Email"
          loading={loading}
          onSubmit={handleResend}
        />

        {success && <p className="text-center text-sm text-green-600">Verification email resent successfully ✅</p>}
      </div>
    </div>
  );
}
