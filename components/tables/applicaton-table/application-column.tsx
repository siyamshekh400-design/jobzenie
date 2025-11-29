"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICandidateProfile } from "@/database/candidate.model";
import { IJob } from "@/database/job.model";
import { formatDate } from "@/lib/utils";

// import { ActionButton } from "../ui/action-button";

export interface AppliedCandidate {
  candidate: ICandidateProfile | undefined;
  status: string;
  resumeSnapshot: string;
  appliedAt: Date;
  job: IJob | undefined;
}

export const applicatonColumns: ColumnDef<AppliedCandidate>[] = [
  {
    accessorKey: "candidate.name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row?.original?.candidate?.name}</div>,
  },

  {
    accessorKey: "candidate.email",
    header: "Email",
    cell: ({ row }) => <div className="text-muted-foreground">{row?.original?.candidate?.email}</div>,
  },

  {
    accessorKey: "candidate.yearOfExperience",
    header: "Experience",
    cell: ({ row }) => <div className="text-muted-foreground">{row?.original?.candidate?.yearOfExperience} years</div>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="text-muted-foreground capitalize">{row?.original?.status}</div>,
  },

  {
    accessorKey: "resumeSnapshot",
    header: "Resume",
    cell: ({ row }) => (
      <Link href={row.original.resumeSnapshot} target="_blank" className="text-blue-600 underline">
        View Resume
      </Link>
    ),
  },

  {
    accessorKey: "appliedAt",
    header: "Applied At",
    cell: ({ row }) => <div className="text-muted-foreground">{formatDate(row.original.appliedAt)}</div>,
  },

  // Action buttons
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/talents/${item?.candidate?._id}`}>
                <Eye size={16} /> View Candidate
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={item.resumeSnapshot} target="_blank">
                <Download size={16} /> Download CV
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
