"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/validations/auth";

const SignInForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      // console.log(values);
      const { error, data } = await authClient.signIn.email(values);
      if (error) {
        // console.log("🚀 ~ onSubmit ~ error:", error);
        if (error.code === "EMAIL_NOT_VERIFIED") {
          toast.error(`Your email is not verified. An email has been sent for verification.`);
          return router.push("/auth/verify");
        }
        toast.error(error.message);
      }

      if (data?.user) {
        toast.success("Login Successful");
        router.replace("/");
      }

      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //   </pre>
      // );
    } catch (error) {
      console.log("sign up form error", error);
      toast.error("Fail to login please try again");
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
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="email@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput disabled={isSubmitting} placeholder="Enter Password" {...field} />
                </FormControl>

                {/* Forgot password link */}
                <div className="flex justify-end">
                  <Link href="/auth/forgot-password" className="text-primary text-sm hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox disabled={isSubmitting} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>

                <div className="space-y-1 leading-none">
                  <FormLabel className="flex cursor-pointer items-start gap-2">
                    <span className="text-muted-foreground text-sm">Remember Me</span>
                  </FormLabel>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Login Button */}
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>

      {/* Google signin */}
      <Button onClick={signInWithGoogle} disabled={isPending} className="w-full">
        {isPending ? "Processing..." : "Sign In With Google"}
      </Button>

      {/* Signup Link */}
      <p className="text-muted-foreground mt-4 text-sm">
        New here?{" "}
        <Link href="/auth/sign-up" className="text-primary font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};
export default SignInForm;
