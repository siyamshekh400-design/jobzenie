"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileText, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <a
        href={row.original.resumeSnapshot}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary inline-flex items-center gap-2 hover:underline"
      >
        <FileText className="h-4 w-4" />
        View
      </a>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const app = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Review
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Review Application</DialogTitle>
              <DialogDescription>
                {app.candidate.name} - {app.job.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Add Comment</label>
                <textarea
                  //   value={comment}
                  //   onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your review comment..."
                  className="mt-2 w-full rounded-md border p-2 text-sm"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="destructive" className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Button className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
