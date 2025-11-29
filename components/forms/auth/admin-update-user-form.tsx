"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUserById } from "@/lib/actions/admin.action";
import { User } from "@/lib/auth";
import { adminUserUpdateSchema, AdminUserUpdateValues } from "@/lib/validations/admin.validate";

// type User = {
//   id?: string;
//   name: string;
//   email: string;
//   password?: string;
//   role: "admin" | "user";
//   accountType: "candidate" | "employee";
//   image?: string | null;
// };

interface AdminCreateUserFormProps {
  data: User;
}

export default function AdminUpdateUserForm({ data }: AdminCreateUserFormProps) {
  const form = useForm<AdminUserUpdateValues>({
    resolver: zodResolver(adminUserUpdateSchema),
    defaultValues: {
      name: data?.name || "",
      email: data.email || "",
      role: data.role || "",
      accountType: data?.accountType || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (values: AdminUserUpdateValues) => {
    // console.log("🚀 ~ handleSubmit ~ values:", values);
    // console.log(data.id);
    try {
      const { success, message, error } = await updateUserById(data.id!, values);
      console.log("🚀 ~ handleSubmit ~ success:", success);
      console.log("🚀 ~ handleSubmit ~ error:", error);
      if (success) {
        toast.success(message);
      } else {
        toast.error(error?.message || "Failed to update user");
      }
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
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Full Name" {...field} disabled={isSubmitting} />
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

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select disabled={isSubmitting} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
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
                    <SelectValue placeholder="Select Account Type" />
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
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
