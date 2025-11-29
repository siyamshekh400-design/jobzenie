"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as z from "zod";

import CreateableMultipleSelector from "@/components/custom-ui/custom-multi-select";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/ui/location-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { experienceOps, genders, languages } from "@/constants/data";
import { ICandidateProfile } from "@/database/candidate.model";
import { createCandidateProfile, updateCandidateProfile } from "@/lib/actions/candidate.action";

const createCandidateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().optional(),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  headline: z.string().min(1, "Headline is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.date().optional(),
  location: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
  }),
  yearOfExperience: z.string().min(1, "required"),
  languages: z.array(z.string()).min(1, { message: "Please select at least one language." }),
  bio: z.string().min(1, "Bio is required"),
});

interface ICandidateProfileFromProps {
  name?: string | undefined;
  email?: string | undefined;
  candidate?: ICandidateProfile;
  accountType?: string | undefined;
  userMongoId?: string | undefined;
  onBoarding?: boolean | undefined;
  formType?: "update" | "create";
}
export function CandidateProfileForm({
  email,
  name,
  accountType,
  userMongoId,
  onBoarding,
  candidate,
  formType,
}: ICandidateProfileFromProps) {
  const router = useRouter();
  const [countryName, setCountryName] = useState<string>(candidate?.location?.country || "");
  const [stateName, setStateName] = useState<string>(candidate?.location?.country || "");

  type ProfileFormValues = z.infer<typeof createCandidateProfileSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(createCandidateProfileSchema),
    defaultValues: {
      name: candidate?.name || name || "",
      email: candidate?.email || email || "",
      phone: candidate?.phone || "",
      gender: candidate?.gender || "",
      headline: candidate?.headline || "",
      yearOfExperience: candidate?.yearOfExperience || "",
      dateOfBirth: candidate?.dateOfBirth ? new Date(candidate.dateOfBirth) : undefined,
      location: candidate?.location || {
        country: "",
        state: "",
      },
      languages: candidate?.languages || [],
      bio: candidate?.bio || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ProfileFormValues) => {
    if (onBoarding && userMongoId && accountType) {
      // first time create
      try {
        const { success, error } = await createCandidateProfile(userMongoId, accountType, { ...data });
        if (success) {
          toast.success(`Your ${accountType} profile created successfully`);
          router.replace("/dashboard/candidate/profile");
        } else {
          toast.error(error?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail to create your profile. Try again");
      }
    }
    if (formType === "update") {
      const { success, error } = await updateCandidateProfile(String(userMongoId), { ...data });
      if (success) {
        toast.success(`Your data is updated successfully`);
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
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-foreground font-semibold">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    disabled={onBoarding || formType === "update"}
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="headline"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="headline" className="text-foreground font-semibold">
                  Headline
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="headline"
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    placeholder="e.g Senior Full-Stack Developer at Google"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email" className="text-foreground flex items-center gap-2 font-semibold">
                  <Mail size={16} /> Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    disabled={onBoarding || formType === "update"}
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone" className="text-foreground flex items-center gap-2 font-semibold">
                  <Phone size={16} /> Phone
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    international
                    defaultCountry="BD"
                    className="py-2"
                    disabled={isSubmitting}
                    placeholder="Enter a phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {genders.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <DateInput className="w-full" value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="location" className="text-foreground font-semibold">
                Location (Country,State)
              </FormLabel>
              <FormControl>
                <FormItem className="flex flex-col flex-wrap">
                  <LocationSelector
                    onCountryChange={(country) => {
                      const selectedCountry = country?.name || "";
                      setCountryName(selectedCountry);

                      // Update form value
                      form.setValue(field.name, {
                        country: selectedCountry,
                        state: stateName || "",
                      });

                      // Clear error when country is selected
                      if (selectedCountry) {
                        form.clearErrors(`location.country`);
                      }
                    }}
                    onStateChange={(state) => {
                      const selectedState = state?.name || "";
                      setStateName(selectedState);

                      form.setValue(field.name, {
                        country: countryName || "",
                        state: selectedState,
                      });

                      if (selectedState) {
                        form.clearErrors(`location.state`);
                      }
                    }}
                  />
                  <FormDescription>Please select state after selecting your country</FormDescription>
                  <FormMessage />
                </FormItem>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="yearOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Experience</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year Of Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {experienceOps.map((e) => (
                        <SelectItem key={e.value} value={e.value}>
                          {e.label}
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
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <CreateableMultipleSelector
                    {...field}
                    value={field.value?.map((v) => ({ label: v, value: v }))}
                    onChange={(opts) => field.onChange(opts.map((o) => o.value))}
                    defaultOptions={languages}
                    creatable
                    placeholder="Enter your job language..."
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
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="bio" className="text-foreground font-semibold">
                Professional Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="bio"
                  disabled={isSubmitting}
                  className="border-border/50 bg-card/50 hover:border-border focus:ring-ring mt-1 min-h-24 w-full resize-none rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full shadow-lg transition-all hover:opacity-90 hover:shadow-xl sm:w-auto"
        >
          <Save size={16} className="mr-2" /> {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
