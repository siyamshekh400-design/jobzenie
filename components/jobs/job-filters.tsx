"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { jobTypes } from "@/constants/data";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { getCountries } from "@/lib/utils";

import FilterInput from "../ui/filter-input";
import SearchInput from "../ui/search-input";

export default function JobFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobType = searchParams.get("jobType") || "";
  const router = useRouter();
  const contries = getCountries();
  const handleReset = () => {
    const newUrl = removeKeysFromUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ["search", "country", "skill", "experience", "location", "jobType"],
    });

    router.push(newUrl, { scroll: false });
  };
  const handleUpdateParams = (value: string, updatedvalue: string, path: string) => {
    if (value === updatedvalue) {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: [path],
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: String(path),
        value,
      });

      router.push(newUrl, { scroll: false });
    }
  };

  // const salaryRanges = [
  //   { label: "$0 - $50k", value: "0-50" },
  //   { label: "$50k - $100k", value: "50-100" },
  //   { label: "$100k - $150k", value: "100-150" },
  //   { label: "$150k+", value: "150+" },
  // ];

  return (
    <div className="sticky top-20 space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <X size={16} className="mr-1" />
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label className="mb-2 block">Search</Label>
            <SearchInput query="search" placeholder="Enter job title or company..." route={pathname} />
          </div>

          {/* Location */}
          <div>
            <Label className="mb-3 block font-semibold">Location</Label>
            <div className="space-y-2">
              <FilterInput filtersOps={contries} filter="location" placeholerText="Select country" />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <Label className="mb-3 block font-semibold">Job Type</Label>
            <div className="space-y-2">
              {jobTypes.map((level) => (
                <div key={level.value} className="flex items-center">
                  <Checkbox
                    id={level.value}
                    checked={jobType === level.value}
                    onCheckedChange={() => {
                      handleUpdateParams(level.value, jobType, "jobType");
                    }}
                  />
                  <Label htmlFor={level.label} className="ml-2 cursor-pointer font-normal">
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <Label className="mb-2 block">Skills</Label>
            <SearchInput query="skill" placeholder="Enter skills tag..." route={pathname} />
          </div>
        </div>
      </Card>
    </div>
  );
}
