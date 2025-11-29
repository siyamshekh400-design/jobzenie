"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function JobFilters() {
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

  const salaryRanges = [
    { label: "$0 - $50k", value: "0-50" },
    { label: "$50k - $100k", value: "50-100" },
    { label: "$100k - $150k", value: "100-150" },
    { label: "$150k+", value: "150+" },
  ];

  return (
    <div className="sticky top-20 space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            // onClick={handleReset}
          >
            <X size={16} className="mr-1" />
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label className="mb-2 block">Search</Label>
            <Input placeholder="Job title..." />
          </div>

          {/* Location */}
          <div>
            <Label className="mb-3 block font-semibold">Location</Label>
            <div className="space-y-2">
              {/* {locations.map((loc) => (
                <div key={loc} className="flex items-center">
                  <Checkbox
                    id={loc}
                    checked={filters.location === loc}
                    onCheckedChange={() =>
                      setFilters({
                        ...filters,
                        location: filters.location === loc ? "" : loc,
                      })
                    }
                  />
                  <Label htmlFor={loc} className="ml-2 cursor-pointer font-normal">
                    {loc}
                  </Label>
                </div>
              ))} */}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <Label className="mb-3 block font-semibold">Job Type</Label>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox
                    id={type}
                    // onCheckedChange={}
                  />
                  <Label htmlFor={type} className="ml-2 cursor-pointer font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <Label className="mb-3 block font-semibold">Salary Range</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select salary range" />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company */}
          <div>
            <Label className="mb-2 block">Company</Label>
            <Input placeholder="Filter by company..." />
          </div>
        </div>
      </Card>
    </div>
  );
}
