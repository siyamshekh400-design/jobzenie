"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { experienceOps, skillLevels } from "@/constants/data";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { getCountries } from "@/lib/utils";

import FilterInput from "../ui/filter-input";
import SearchInput from "../ui/search-input";

export default function TalentFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slevel = searchParams.get("slevel") || "";
  const contries = getCountries();

  const handleReset = () => {
    const newUrl = removeKeysFromUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ["search", "country", "skill", "experience", "location", "slevel"],
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
            <SearchInput query="search" placeholder="Enter name or title..." route={pathname} />
          </div>

          {/* Location */}
          <div>
            <Label className="mb-3 block font-semibold">Location</Label>
            <div className="space-y-2">
              <FilterInput filtersOps={contries} filter="country" placeholerText="Select country" />
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <Label className="mb-3 block font-semibold">Skill Level</Label>
            <div className="space-y-2">
              {skillLevels.map((level) => (
                <div key={level.value} className="flex items-center">
                  <Checkbox
                    id={level.value}
                    checked={slevel === level.value}
                    onCheckedChange={() => {
                      handleUpdateParams(level.value, slevel, "slevel");
                    }}
                  />
                  <Label htmlFor={level.label} className="ml-2 cursor-pointer font-normal">
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <Label className="mb-3 block font-semibold">Experience</Label>
            <FilterInput filtersOps={experienceOps} filter="experience" placeholerText="Years of Experience" />
          </div>

          {/* Skills */}
          <div>
            <Label className="mb-2 block">Skills</Label>
            <SearchInput query="skill" placeholder="Enter skills tag..." route={pathname} />
          </div>
        </div>
      </Card>
    </div>
  );
}
