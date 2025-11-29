"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { applyToJob } from "@/lib/actions/application.action";
import { addToSaveJob } from "@/lib/actions/candidate.action";

import { ActionButton } from "../ui/action-button";

interface IButtonProps {
  candidateId: string;
  jobId: string;
}

const ApplyJobButton = ({ candidateId, jobId }: IButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveJobToggle = async (logddedIncandidateId: string, jobId: string) => {
    setIsLoading(true);

    try {
      const { success, error } = await addToSaveJob(logddedIncandidateId, jobId);
      if (success) {
        setIsLoading(false);
        return toast.success("Add to save jobs");
      } else {
        setIsLoading(false);
        return toast.error(error?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActionButton
      action={() => applyToJob(candidateId, jobId)}
      //   disabled={isLoading}
      requireAreYouSure
      areYouSureDescription="Confirm your application,Your resume will automatically send to company"
      variant="ghost"
      size="lg"
      className="from-primary to-accent hover:from-primary hover:to-accent mb-4 w-full cursor-pointer bg-linear-to-r font-semibold"
    >
      {"Apply Now"}
    </ActionButton>
  );
};
export default ApplyJobButton;
