"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { IEducation } from "@/database/candidate.model";
import { addEducationToCandidateProfile, updateEducationInCandidateProfile } from "@/lib/actions/candidate.action";
import { EducationFormValues, educationSchema } from "@/lib/validations/candidate.validate";

interface IEducationFromProps {
  type: "add" | "edit";
  education?: IEducation;
  userId?: string | undefined;
  educationId?: string | undefined;
}

export function CandidateEducationForm({ type, education, userId, educationId }: IEducationFromProps) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: education?.institution || "",
      degree: education?.degree || "",
      fieldOfStudy: education?.fieldOfStudy || "",
      graduationYear: education?.graduationYear ? new Date(education?.graduationYear) : undefined,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: EducationFormValues) => {
    console.log("Form data:", data);
    if (type === "add" && userId) {
      //todo: Add experience
      const { success, error } = await addEducationToCandidateProfile(userId, { ...data });
      if (success) {
        toast.success("New Education added successfuly");
        form.reset();
      } else {
        toast.error(error?.message);
      }
    } else {
      //todo: edite experience
      const { success, error } = await updateEducationInCandidateProfile(String(userId), String(educationId), {
        ...data,
      });
      if (success) {
        toast.success("Update Education  successfuly");
        form.reset();
      } else {
        toast.error(error?.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-purple-400/50">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`institution`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">School/University</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`degree`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Degree</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`fieldOfStudy`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`graduationYear`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Graduation Year</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button disabled={isSubmitting} type="submit" size="default">
              {isSubmitting ? (
                <>
                  <Spinner />
                  saving...
                </>
              ) : (
                <>
                  <Save size={14} />
                  save
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
