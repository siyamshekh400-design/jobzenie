"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MapPin, DollarSign, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IJob } from "@/database/job.model";
import { removeFromSavedJob } from "@/lib/actions/candidate.action";

import { ActionButton } from "../ui/action-button";

type SavedJobWithCandidate = IJob & {
  candidateId: string;
};

export const savedColumns: ColumnDef<SavedJobWithCandidate>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.original?.title}</div>,
  },

  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original?.companyName}</div>,
  },

  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="text-muted-foreground flex items-center gap-2">
        <MapPin size={16} /> {row.original.location}
      </div>
    ),
  },

  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <div className="text-muted-foreground flex items-center gap-2">
        <DollarSign size={16} /> {`${row.original?.salary?.min}-${row.original?.salary?.min}`}
      </div>
    ),
  },

  // Action Buttons
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="flex gap-2">
          <Link href={`/jobs/${job._id}`}>
            <Button size="sm">Apply Now</Button>
          </Link>

          <ActionButton
            requireAreYouSure
            areYouSureDescription="Do you want to remove this from wish list"
            size="sm"
            variant="destructive"
            action={() => removeFromSavedJob(String(job.candidateId), String(job._id))}
          >
            <Trash2 size={16} />
          </ActionButton>
        </div>
      );
    },
  },
];
