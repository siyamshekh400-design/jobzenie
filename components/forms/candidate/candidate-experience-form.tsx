"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { IExperience } from "@/database/candidate.model";
import { addExperienceToCandidateProfile, updateExperienceInCandidateProfile } from "@/lib/actions/candidate.action";
import { ExperienceFormValues, experienceSchema } from "@/lib/validations/candidate.validate";

interface IExperienceFromProps {
  type: "add" | "edit";
  experience?: IExperience;
  userId?: string | undefined;
  experienceId?: string | undefined;
}

export function CandidateExperienceForm({ type, experience, userId, experienceId }: IExperienceFromProps) {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      position: experience?.position || "",
      company: experience?.company || "",
      startDate: experience?.startDate ? new Date(experience?.startDate) : undefined,
      endDate: experience?.endDate ? new Date(experience?.endDate) : undefined,
      description: experience?.description || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ExperienceFormValues) => {
    console.log(data);
    if (type === "add" && userId) {
      //todo: Add experience
      const { success, error } = await addExperienceToCandidateProfile(userId, { ...data });
      if (success) {
        toast.success("New experiece added successfuly");
        form.reset();
      } else {
        toast.error(error?.message);
      }
    } else {
      //todo: edite experience
      const { success, error } = await updateExperienceInCandidateProfile(String(userId), String(experienceId), {
        ...data,
      });
      if (success) {
        toast.success("Update experiece  successfuly");
        form.reset();
      } else {
        toast.error(error?.message);
      }
    }
    // toast(
    //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //   </pre>
    // );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-green-400/50">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`position`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">Position</FormLabel>
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
              name={`company`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">Company</FormLabel>
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
              name={`startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">Start Date</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormDescription>starting date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">End Date</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormDescription>No need if you are still working</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 space-y-2">
            <FormField
              control={form.control}
              name={`description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your responsibilities and achievements..."
                      className="border-border/50 bg-card/50 hover:border-border focus:ring-ring min-h-20 w-full resize-none rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
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
