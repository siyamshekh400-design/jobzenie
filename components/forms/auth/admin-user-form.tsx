"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminUserCreateSchema } from "@/lib/validations/admin.validate";

type User = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  accountType: "candidate" | "employee";
  image?: string | null;
};

interface AdminCreateUserFormProps {
  onSubmit: (data: User) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function AdminCreateUserForm({ onSubmit, onClose, isLoading }: AdminCreateUserFormProps) {
  const form = useForm<z.infer<typeof adminUserCreateSchema>>({
    resolver: zodResolver(adminUserCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      accountType: "candidate",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (values: z.infer<typeof adminUserCreateSchema>) => {
    try {
      // Call the parent onSubmit function
      onSubmit(values);

      // Reset the form after successful submission
    } catch (error) {
      console.log("Error creating user:", error);
      toast.error("Failed to create user. Please try again.");
    }
    // form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
              </FormControl>
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
                <Input type="email" placeholder="john@example.com" disabled={isSubmitting} {...field} />
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
                <PasswordInput type="password" placeholder="Enter Password" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select disabled={isSubmitting} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select disabled={isSubmitting} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 pt-6">
          <Button type="submit" className="flex-1 cursor-pointer" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Creating..." : "Create User"}
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
