"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { signupFormSchema } from "@/lib/validations/auth";

interface ISignUpFormProps {
  accountType: "candidate" | "employee";
}

export default function SignUpForm({ accountType }: ISignUpFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  // console.log(accountType);
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      accountType: accountType,
      confirmPassword: "",
      agreeOnTerms: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // console.log(`${process.env.NEXT_PUBLIC_APP_URL}/onboarding/profile`);
  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    try {
      const { data, error } = await authClient.signUp.email({
        ...values,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        accountType,
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/profile`,
      });
      if (error) {
        toast.error(error.message);
      }
      if (data?.user) {
        // console.log("🚀 ~ onSubmit ~ data?.user):", data?.user);
        toast.success("An email has been sent to your email address for verification.");
        return router.push("/auth/verify");
      }
      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify({ ...values, accountType }, null, 2)}</code>
      //   </pre>
      // );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const signInWithGoogle = async () => {
    setIsPending(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `/`,
    });

    if (error) {
      setIsPending(false);
      return toast.error(error.message);
    }
    setIsPending(false);
    toast.success("Google sign successful");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="Enter Your Name" type="text" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="email@exaple.com" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput disabled={isSubmitting} placeholder="Enter Password" {...field} />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comfirm Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} disabled={isSubmitting} placeholder="confirm your password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeOnTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox disabled={isSubmitting} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex cursor-pointer items-start gap-2">
                    <span className="text-muted-foreground text-sm">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </FormLabel>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>

      {/* Google signin */}
      <Button onClick={signInWithGoogle} disabled={isPending} className="w-full">
        {isPending ? "Processing..." : "Sign In With Google"}
      </Button>

      {/* Signup Link */}
      <p className="text-muted-foreground mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-up" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
