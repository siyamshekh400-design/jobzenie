"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserName } from "@/lib/actions/auth.action";

// ⬇️ Validation schema
const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(32, "Max 32 characters allowed"),
});

interface IProfileNameProps {
  name: string;
  email: string;
  accountType: string | null | undefined;
}

export function ProfileNameForm({ name, accountType, email }: IProfileNameProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(DataTransfer);
      // your API logic here
      const { success, message, error } = await updateUserName(data.name, email, String(accountType));
      if (success) {
        return toast.success(message);
      } else {
        return toast.error(error?.message || "Fail to update name");
      }
    } catch (error) {
      console.log(error);
      toast.error("unknown error occured");
    }
  }

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-card-foreground text-lg font-semibold">Name</CardTitle>
            <CardDescription className="text-muted-foreground">
              Please enter your full name, or a display name.
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className="bg-background border-input" {...field} />
                  </FormControl>
                  <FormDescription>This will be displayed on your profile.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col items-start justify-between gap-4 pt-4 pb-4 sm:flex-row sm:items-center">
            <p className="text-muted-foreground text-sm">Please use 32 characters at maximum.</p>

            <Button
              disabled={isSubmitting}
              type="submit"
              variant="secondary"
              size="sm"
              className="w-full px-4 sm:w-auto"
            >
              {isSubmitting ? "saving..." : "save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
