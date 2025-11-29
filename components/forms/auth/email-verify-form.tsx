"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailFormProps {
  buttonText?: string;
  onSubmit: (data: EmailFormValues) => Promise<void>;
  loading?: boolean;
  label?: string;
}

export default function EmailVerifyForm({
  onSubmit,
  buttonText = "Submit",
  loading = false,
  label = "Email",
}: EmailFormProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Processing..." : buttonText}
        </Button>
      </form>
    </Form>
  );
}
