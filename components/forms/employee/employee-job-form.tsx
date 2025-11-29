"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import mongoose from "mongoose";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import CreateableMultipleSelector from "@/components/custom-ui/custom-multi-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect, MultiSelectRef } from "@/components/ui/multi-select";
import { NumberInput } from "@/components/ui/number-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { experienceOps, jobBenefits, jobTypes, skillLevels, skillsGroupOptions } from "@/constants/data";
import { IJob } from "@/database/job.model";
import { createNewJob, updateExistingJobById } from "@/lib/actions/job.action";
import { getCountries } from "@/lib/utils";
import { jobFormSchema, type JobFormValues } from "@/lib/validations/job";

interface IJobFromProps {
  formType: "create" | "update";
  mongoData?: Partial<IJob>;
  jobId?: mongoose.Types.ObjectId | string | undefined;
  employeeId?: mongoose.Types.ObjectId | string | undefined;
}

export default function JobForm({ formType, jobId, employeeId, mongoData }: IJobFromProps) {
  const router = useRouter();
  const countries = getCountries();
  const multiSelectRef = useRef<MultiSelectRef>(null);

  const clearAllSkills = () => {
    if (multiSelectRef.current) {
      multiSelectRef.current.clear();
    }
  };

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: mongoData?.title || "",
      location: mongoData?.location || "",
      salary: {
        min: mongoData?.salary?.min ?? undefined,
        max: mongoData?.salary?.max ?? undefined,
      },
      yearOfExperieence: mongoData?.yearOfExperieence || "",
      skillLelvel: mongoData?.skillLelvel || "",
      benefits: mongoData?.benefits || [],
      skillsRequired: mongoData?.skillsRequired || [],
      jobType: mongoData?.jobType || "",
      description: mongoData?.description || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: JobFormValues) {
    try {
      // Simulate API call
      if (formType === "create" && employeeId) {
        //todo: create job
        const { success, error } = await createNewJob(employeeId, values);
        if (success) {
          toast.success(`Your job is created successfully`);
          form.reset();
          router.push(`/dashboard/employee/jobs`);
        } else {
          toast.error(error?.message);
        }
      }
      if (formType === "update" && jobId) {
        //todo: create job
        const { success, error } = await updateExistingJobById(jobId, values);
        if (success) {
          toast.success(`Your job is updated successfully`);
          router.push(`/dashboard/employee/jobs`);
        } else {
          toast.error(error?.message);
        }
      }
      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //   </pre>
      // );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      {/* {submitSuccess && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <p className="font-medium text-green-800 dark:text-green-100">✓ Job posting created successfully!</p>
        </div>
      )} */}

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Enter the information about the job opening</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Senior Developer" {...field} />
                      </FormControl>
                      <FormDescription>The title of the job position</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="salary.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Salary</FormLabel>
                      <FormControl>
                        <NumberInput placeholder="Minimum Salary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary.max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Salary</FormLabel>
                      <FormControl>
                        <NumberInput placeholder="Maximum Salary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {jobTypes.map((c) => (
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
                <FormField
                  control={form.control}
                  name="skillLelvel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {skillLevels.map((c) => (
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
              </div>

              <FormField
                control={form.control}
                name="skillsRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Required Skills</FormLabel>
                    <FormControl>
                      <MultiSelect
                        ref={multiSelectRef}
                        options={skillsGroupOptions}
                        value={field.value}
                        modalPopover={true}
                        disabled={isSubmitting}
                        defaultValue={mongoData?.skillsRequired || []}
                        onValueChange={field.onChange}
                        placeholder="Choose skills..."
                        className="w-full md:w-96"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="yearOfExperieence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year of experiene" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {experienceOps.map((c) => (
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
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits</FormLabel>
                      <FormControl>
                        <CreateableMultipleSelector
                          {...field}
                          value={field.value?.map((v) => ({ label: v, value: v }))}
                          onChange={(opts) => field.onChange(opts.map((o) => o.value))}
                          defaultOptions={jobBenefits}
                          creatable
                          placeholder="Enter your job benefits..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job requirements and responsibilities..."
                        className="min-h-40 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between">
                      <FormDescription>Include key responsibilities, qualifications, and requirements</FormDescription>
                      <span className="text-muted-foreground text-xs">{field.value.length}/2000</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                      Posting...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    clearAllSkills();
                  }}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
