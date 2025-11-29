"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 1. Define your validation schema
const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

interface EmailFormProps {
  userEmail?: string; // Prop to pass existing data
}

export function EmailForm({ userEmail }: EmailFormProps) {
  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userEmail || "",
    },
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);

    toast(`Your email has been changed to ${values.email}`);
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-card-foreground text-lg font-semibold">Email</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter the email address you want to use to log in.
        </CardDescription>
      </CardHeader>

      {/* 4. Wrap content in the Form component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled {...field} className="bg-background border-input max-w-full" />
                  </FormControl>
                  {/* This displays validation errors immediately below input */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col items-start justify-between gap-4 pt-4 pb-4 sm:flex-row sm:items-center">
            <p className="text-muted-foreground text-sm">Please enter a valid email address.</p>
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="w-full px-4 sm:w-auto"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
