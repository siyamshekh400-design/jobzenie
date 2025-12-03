"use client";
import { XCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { approveApplication, rejectApplication } from "@/lib/actions/admin.action";

import { Spinner } from "../ui/spinner";

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

interface IButtonProps {
  app: ApplicationData;
}

const ReviewApplicantsButton = ({ app }: IButtonProps) => {
  const [loadingAction, setLoadingAction] = useState<"approved" | "rejected" | null>(null);
  const [comment, setComment] = useState<string>("");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const handleApprove = async (applicationId: string, comment: string) => {
    setLoadingAction("approved");
    const { success, message, error } = await approveApplication(applicationId, comment || "");

    if (success) {
      toast.success(message);
      setComment("");
      setLoadingAction(null);
      setSelectedAppId(null);
    } else {
      toast.error(error?.message || "Error:Approving application");
      setLoadingAction(null);
      setSelectedAppId(null);
    }
  };

  const handleReject = async (applicationId: string, comment: string) => {
    setLoadingAction("rejected");
    const { success, message, error } = await rejectApplication(applicationId, comment || "");

    if (success) {
      toast.success(message);
      setComment("");
      setLoadingAction(null);
      setSelectedAppId(null);
    } else {
      toast.error(error?.message || "Error:Approving application");
      setLoadingAction(null);
      setSelectedAppId(null);
    }
  };

  return (
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
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your review comment..."
              className="mt-2 w-full rounded-md border p-2 text-sm"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              disabled={loadingAction === "rejected"}
              onClick={() => handleReject(app._id, comment)}
              variant="destructive"
              className="gap-2"
            >
              {loadingAction === "rejected" ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Loading..
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Reject
                </>
              )}
            </Button>
            <Button
              disabled={loadingAction === "approved"}
              onClick={() => handleApprove(app._id, comment)}
              className="gap-2"
            >
              {loadingAction === "approved" ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Loading..
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewApplicantsButton;
