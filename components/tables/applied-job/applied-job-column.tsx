"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export type Application = {
  id?: string;
  jobId?: string;
  title: string;
  companyName: string;
  status: string;
  appliedDate: string;
  location: string;
  salary: string;
};

export const appliedColumns: ColumnDef<Application>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const jobId = row.original.jobId;
      const title = row.original.title;
      return <Link href={`/jobs/${jobId}`}>{title}</Link>;
    },
  },
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "appliedDate",
    header: "Applied",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const statusStyles: Record<Application["status"], string> = {
        submitted: "bg-blue-500/20 text-blue-600",
        reviewed: "bg-purple-500/20 text-purple-600",
        interviewing: "bg-yellow-500/20 text-yellow-600",
        offered: "bg-green-500/20 text-green-600",
        rejected: "bg-red-500/20 text-red-600",
        withdrawn: "bg-gray-500/20 text-gray-600",
      };

      return <Badge className={statusStyles[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    },
  },
];
