"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { companySizeOps, industries } from "@/constants/data";
import { IEmployerProfile } from "@/database/employee.model";
import { createEmployeeProfile, updateEmployeeProfile } from "@/lib/actions/employee.action";
import { getCountries } from "@/lib/utils";
import { employeeFormSchema, EmployeeProfileFormValues } from "@/lib/validations/employee.validatoin";

interface ICandidateEmployeeFromProps {
  name?: string | undefined;
  email?: string | undefined;
  employee?: IEmployerProfile;
  accountType?: string | undefined;
  userMongoId?: string | undefined;
  onBoarding?: boolean | undefined;
  formType?: "update" | "create";
}
export function EmployeeProfileForm({
  name,
  email,
  onBoarding,
  formType,
  userMongoId,
  accountType,
  employee,
}: ICandidateEmployeeFromProps) {
  const countries = getCountries();
  const router = useRouter();
  // Initialize form with react-hook-form and zod resolver
  const form = useForm<EmployeeProfileFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: employee?.name || name || "",
      email: employee?.email || email || "",
      companyName: employee?.companyName || "",
      companySize: employee?.companySize || "",
      country: employee?.country || "",
      industry: employee?.industry || "",
      about: employee?.about || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // ------------------------------
  // 3. Submit Handler
  // ------------------------------
  async function onSubmit(data: EmployeeProfileFormValues) {
    try {
      if (onBoarding && userMongoId && accountType === "employee") {
        // first time create
        try {
          const { success, error } = await createEmployeeProfile(userMongoId, accountType, { ...data });
          if (success) {
            toast.success(`Your ${accountType} is created successfully`);
            router.replace("/dashboard/employee/profile");
          } else {
            toast.error(error?.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Fail to create your profile. Try again");
        }
      }
      if (formType === "update") {
        const { success, error } = await updateEmployeeProfile(String(userMongoId), { ...data });
        if (success) {
          toast.success(`Your data is upddated successfully`);
        } else {
          toast.error(error?.message);
        }
      }

      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // );

      // Optionally reset form after success
      // form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  disabled={isSubmitting || onBoarding || formType === "update"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  {...field}
                  disabled={isSubmitting || onBoarding || formType === "update"}
                />
              </FormControl>
              <FormDescription>This will be used for account notifications.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name Field */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companySizeOps.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Industry Field */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {industries.map((i) => (
                        <SelectItem key={i.value} value={i.value}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location Field */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countries.map((i) => (
                        <SelectItem key={i.value} value={i.value}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Company</FormLabel>
              <FormControl>
                <Textarea placeholder="Write about Your company.." className="min-h-40 resize-none" {...field} />
              </FormControl>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">{field.value.length}/2000</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
          {isSubmitting ? (
            <>
              <Spinner />
              <span>Submitting</span>
            </>
          ) : (
            <>{formType === "create" ? "Create Profile" : "Update profile"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
