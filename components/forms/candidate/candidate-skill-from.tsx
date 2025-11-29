"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { skillsGroupOptions } from "@/constants/data";
import { candidateSkillsUpload } from "@/lib/actions/candidate.action";

const FormSchema = z.object({
  skills: z.array(z.string()).min(1, { message: "Please select at least one skill." }),
});
interface ISkillsFormProps {
  userId?: string;
  mongoSkills?: string[];
}

const CandidateSkillForm = ({ mongoSkills = [], userId }: ISkillsFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { success, error } = await candidateSkillsUpload(String(userId), data.skills);
      if (success) toast.success("Skills added successfully");
      else toast.error(error?.message);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast.error("Error while skill update");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-4 text-xl font-bold">Select Skills</FormLabel>
              <FormControl>
                <MultiSelect
                  options={skillsGroupOptions}
                  value={field.value}
                  modalPopover={true}
                  disabled={isSubmitting}
                  defaultValue={mongoSkills?.length > 0 ? mongoSkills : []}
                  onValueChange={field.onChange}
                  placeholder="Choose skills..."
                  className="w-full md:w-96 lg:w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mongoSkills?.length > 0 ? (
          <div className="flex gap-3">
            <p>Current skills:</p>
            <div className="flex gap-3">
              {mongoSkills.map((item) => {
                return (
                  <Badge variant={"outline"} key={item}>
                    {item}
                  </Badge>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text p-4">No Skills Added yet.</div>
        )}
        <Button disabled={isSubmitting} className="w-full" type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
export default CandidateSkillForm;
