"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileText } from "lucide-react";
import Link from "next/link";

import ReviewApplicantsButton from "@/components/action-buttion/review-applicant-button";
import { Badge } from "@/components/ui/badge";

interface ApplicationData {
  _id: string;
  job: {
    _id: string;
    title: string;
    companyName: string;
  };
  candidate: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    skills?: string[];
  };
  resumeSnapshot: string;
  status: string;
  adminReview: {
    status: "pending" | "approved" | "rejected";
    comment?: string;
    reviewedAt?: Date;
  };
  createdAt: string;
}

export const adminApplicaitonColumns: ColumnDef<ApplicationData>[] = [
  {
    accessorKey: "candidate",
    header: "Candidate",
    accessorFn: (row) => `${row.candidate.name} ${row.candidate.email}`,
    cell: ({ row }) => {
      const candidate = row.original.candidate;
      return (
        <div>
          <p className="font-semibold">{candidate.name}</p>
          <p className="text-muted-foreground text-sm">{candidate.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "job.title",
    header: "Job Position",
    cell: ({ row }) => row.original.job.title,
  },
  {
    accessorKey: "job.companyName",
    header: "Company",
    cell: ({ row }) => row.original.job.companyName,
  },
  {
    accessorKey: "candidate.phone",
    header: "Contact",
    cell: ({ row }) => row.original.candidate.phone || "N/A",
  },
  {
    accessorKey: "candidate.skills",
    header: "Skills",
    cell: ({ row }) => {
      const skills = row.original.candidate.skills || [];
      return (
        <div className="flex flex-wrap gap-1">
          {skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{skills.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "resumeSnapshot",
    header: "Resume",
    cell: ({ row }) => (
      <Link
        href={row.original.resumeSnapshot}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary inline-flex items-center gap-2 hover:underline"
      >
        <FileText className="h-4 w-4" />
        View
      </Link>
    ),
  },
  {
    id: "admin.status",
    header: "Status",
    cell: ({ row }) => {
      const currentStatus = row.original.adminReview?.status || "pending";
      const statusStyles: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
        approved: "bg-green-100 text-green-800 border-green-300",
        rejected: "bg-red-100 text-red-800 border-red-300",
      };
      return (
        <span
          className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium capitalize ${
            statusStyles[currentStatus]
          }`}
        >
          {currentStatus}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const app = row.original;

      return <ReviewApplicantsButton app={app} />;
    },
  },
];
