"use client";

import { MapPin, DollarSign, Users, Eye, Trash2, Edit, ChevronDown } from "lucide-react";
import Link from "next/link";

import { ActionButton } from "@/components/ui/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IJob } from "@/database/job.model";
import { deleteJob } from "@/lib/actions/job.action";
import { getTimeStamp } from "@/lib/utils";

interface EmployeeJobListProps {
  job: IJob;
}

export default function EmployeeJobList({ job }: EmployeeJobListProps) {
  const firstThree = job?.skillsRequired.slice(0, 3);
  const remaining = job?.skillsRequired.slice(3);
  return (
    <div className="space-y-4">
      <Card className="mt-4 p-6 transition-shadow hover:shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Job Info */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-lg font-semibold">{job.title}</h3>

              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  job?.status === "open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {job.status}
              </span>
            </div>

            <p className="text-muted-foreground mb-3">Posted {getTimeStamp(job.createdAt)}</p>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
              <div className="text-muted-foreground flex items-center gap-2">
                <MapPin size={16} />
                {job.location}
              </div>

              <div className="text-muted-foreground flex items-center gap-2">
                <DollarSign size={16} />
                {`${job?.salary?.min}-${job?.salary?.max}`}
              </div>

              <div className="text-muted-foreground flex items-center gap-2">
                <Users size={16} />
                {job?.countApplicatons || 0} Applications
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {firstThree?.slice(0, 3).map((skill) => {
                return <Badge key={skill}>{skill}</Badge>;
              })}
              {remaining.length > 0 && <Badge>{remaining.length} +more</Badge>}
            </div>
            {/* buttons */}
            <div className="mt-3">
              <Button variant={"secondary"} className="text-wrap">
                <Link href="/dashboard/employee/jobs/new">View Applicants</Link>
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full shadow-none" aria-label="Open edit menu">
                  <ChevronDown size={16} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/jobs/${job._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Job
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/employee/jobs/${job._id}/applicants`}>
                    <Eye size={16} /> View applicants
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/employee/jobs/edit/${job._id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem variant="destructive">
                  <Trash2 size={16} aria-hidden="true" />
                  Delete
                  <ActionButton action={() => deleteJob(job.id)}>Delete</ActionButton>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>

            <ActionButton
              requireAreYouSure
              areYouSureDescription="Do you want to delete this job"
              action={() => deleteJob(String(job._id))}
              size="sm"
              variant="destructive"
            >
              <Trash2 size={16} />
            </ActionButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
