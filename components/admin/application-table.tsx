"use client";

import { CheckCircle, XCircle, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// import { approveApplication, rejectApplication } from "@/lib/actions/application-actions";

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

interface ApplicationTableProps {
  applications: ApplicationData[] | undefined;
  adminId?: string;
  onStatusChange?: () => void;
}

export function ApplicationTable({ applications }: ApplicationTableProps) {
  // const [loadingId, setLoadingId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  //   const handleApprove = async (applicationId: string) => {
  //     setLoadingId(applicationId);
  //     const result = await approveApplication(applicationId, adminId, comment || undefined);

  //     if (result.success) {
  //       onStatusChange?.();
  //       setComment("");
  //       setSelectedAppId(null);
  //     } else {
  //       alert("Error approving application: " + result.error);
  //     }
  //     setLoadingId(null);
  //   };

  //   const handleReject = async (applicationId: string) => {
  //     setLoadingId(applicationId);
  //     const result = await rejectApplication(applicationId, adminId, comment || undefined);

  //     if (result.success) {
  //       onStatusChange?.();
  //       setComment("");
  //       setSelectedAppId(null);
  //     } else {
  //       alert("Error rejecting application: " + result.error);
  //     }
  //     setLoadingId(null);
  //   };

  return (
    <div className="border-border bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="border-border border-b hover:bg-transparent">
            <TableHead className="text-foreground font-semibold">Candidate</TableHead>
            <TableHead className="text-foreground font-semibold">Job Position</TableHead>
            <TableHead className="text-foreground font-semibold">Company</TableHead>
            <TableHead className="text-foreground font-semibold">Contact</TableHead>
            <TableHead className="text-foreground font-semibold">Skills</TableHead>
            <TableHead className="text-foreground font-semibold">Resume</TableHead>
            <TableHead className="text-foreground text-center font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                No pending applications
              </TableCell>
            </TableRow>
          ) : (
            applications?.map((app) => (
              <TableRow key={app._id} className="border-border border-b">
                <TableCell className="font-medium">
                  <div>
                    <p className="text-foreground font-semibold">{app?.candidate?.name}</p>
                    <p className="text-muted-foreground text-sm">{app?.candidate?.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{app?.job?.title}</TableCell>
                <TableCell className="text-foreground">{app?.job?.companyName}</TableCell>
                <TableCell className="text-foreground text-sm">{app?.candidate?.phone || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {app?.candidate?.skills?.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {app?.candidate?.skills && app?.candidate?.skills?.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{app?.candidate?.skills?.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={app?.resumeSnapshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-2 hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    View
                  </a>
                </TableCell>
                <TableCell className="text-center">
                  <Dialog
                    open={selectedAppId === app._id}
                    onOpenChange={(open) => {
                      if (!open) {
                        setSelectedAppId(null);
                        setComment("");
                      } else {
                        setSelectedAppId(app._id);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 bg-transparent"
                        // disabled={loadingId === app._id}
                      >
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
                          <label className="text-foreground text-sm font-medium">Add Comment (Optional)</label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add your review comment..."
                            className="border-border bg-background text-foreground focus:ring-ring mt-2 w-full rounded-md border p-2 text-sm focus:ring-2 focus:outline-none"
                            rows={4}
                          />
                        </div>

                        <div className="flex justify-end gap-3">
                          <Button
                            variant="destructive"
                            // onClick={() => handleReject(app._id)}
                            // disabled={loadingId === app._id}
                            className="gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                          <Button
                            // onClick={() => handleApprove(app._id)}
                            // disabled={loadingId === app._id}
                            className="gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
