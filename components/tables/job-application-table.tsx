"use client";

import { CheckCircle, FileTextIcon, Loader2, PauseIcon, PlayIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "submitted" | "reviewed" | "interviewing" | "offered" | "rejected" | "withdrawn";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  notes: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  status: ApplicationStatus;
  applied: string;
  resume: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  status: ApplicationStatus;
  applied: string;
  resume: string;
}

type ApplicationStatus = "submitted" | "reviewed" | "interviewing" | "offered" | "rejected" | "withdrawn";

type TaskActionType = "start" | "pause" | "complete" | "delete" | "view";

const applications: Application[] = [
  {
    id: "APP-001",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    status: "interviewing",
    applied: "2024-03-25",
    resume: "/resumes/sarah-chen.pdf",
  },
  {
    id: "APP-002",
    name: "Michael Torres",
    email: "michael.torres@example.com",
    status: "submitted",
    applied: "2024-03-20",
    resume: "/resumes/michael-torres.pdf",
  },
  {
    id: "APP-003",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    status: "rejected",
    applied: "2024-03-22",
    resume: "/resumes/emma-rodriguez.pdf",
  },
  {
    id: "APP-004",
    name: "James Wilson",
    email: "james.wilson@example.com",
    status: "reviewed",
    applied: "2024-03-28",
    resume: "/resumes/james-wilson.pdf",
  },
  {
    id: "APP-005",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    status: "offered",
    applied: "2024-03-24",
    resume: "/resumes/olivia-martinez.pdf",
  },
  {
    id: "APP-006",
    name: "Lucas Anderson",
    email: "lucas.anderson@example.com",
    status: "withdrawn",
    applied: "2024-03-30",
    resume: "/resumes/lucas-anderson.pdf",
  },
  {
    id: "APP-007",
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    status: "submitted",
    applied: "2024-03-19",
    resume: "/resumes/sophia-taylor.pdf",
  },
];

function getStatusBadge(status: Task["status"]) {
  switch (status) {
    case "submitted":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-gray-500/15 text-gray-700 hover:bg-gray-500/25 dark:bg-gray-500/10 dark:text-gray-300 dark:hover:bg-gray-500/20"
        >
          Submitted
        </Badge>
      );

    case "reviewed":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
        >
          Reviewed
        </Badge>
      );

    case "interviewing":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-purple-500/15 text-purple-700 hover:bg-purple-500/25 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
        >
          Interviewing
        </Badge>
      );

    case "offered":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
        >
          Offered
        </Badge>
      );

    case "rejected":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
        >
          Rejected
        </Badge>
      );

    case "withdrawn":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
        >
          Withdrawn
        </Badge>
      );

    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function JobApplicationTable() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: TaskActionType;
  } | null>(null);

  const isTaskActionPending = (action: TaskActionType, appId: string) =>
    pendingAction?.id === appId && pendingAction.type === action;

  const isTaskBusy = (appId: string) => pendingAction?.id === appId;

  const handleAction = (task: Application, actionType: TaskActionType) => {
    setPendingAction({ id: task.id, type: actionType });
    setTimeout(() => {
      setPendingAction(null);
      console.log(`Action "${actionType}" completed for task:`, task.email);
    }, 1000);
  };

  const renderApplicationRow = (app: Application) => {
    const busy = isTaskBusy(app.id);
    const deletePending = isTaskActionPending("delete", app.id);

    return (
      <TableRow key={app.id} className="hover:bg-muted/50">
        {/* Name */}
        <TableCell className="h-16 px-4 font-medium">{app.name}</TableCell>

        {/* Email */}
        <TableCell className="text-muted-foreground h-16 px-4 text-sm">{app.email}</TableCell>

        {/* Status */}
        <TableCell className="h-16 px-4">{getStatusBadge(app.status)}</TableCell>

        {/* Applied Date */}
        <TableCell className="text-muted-foreground h-16 px-4 text-sm">{app.applied}</TableCell>

        {/* Resume */}
        <TableCell className="h-16 px-4">
          <Link
            href={app.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:opacity-80"
          >
            View Resume
          </Link>
        </TableCell>

        {/* Actions */}
        <TableCell className="h-16 px-4">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              {/* Delete */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:bg-destructive h-8 w-8 hover:text-white"
                    onClick={() => handleAction(app, "delete")}
                    disabled={busy}
                  >
                    {deletePending ? <Loader2 className="size-4 animate-spin" /> : <Trash2Icon className="size-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Application</TooltipContent>
              </Tooltip>

              {/* View Details */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction(app, "view")}
                    disabled={busy}
                  >
                    <FileTextIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <div className="bg-card w-[95%] rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="h-12 px-4 font-medium">Name</TableHead>
            <TableHead className="h-12 px-4 font-medium">Email</TableHead>
            <TableHead className="h-12 w-[120px] px-4 font-medium">Status</TableHead>

            <TableHead className="h-12 px-4 font-medium">Applied</TableHead>
            <TableHead className="h-12 px-4 font-medium">Resume</TableHead>
            <TableHead className="h-12 w-[180px] px-4 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{applications.map(renderApplicationRow)}</TableBody>
      </Table>
    </div>
  );
}
