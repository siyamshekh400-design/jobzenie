"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { addToSaveJob } from "@/lib/actions/candidate.action";

interface IButtonProps {
  candidateId: string;
  jobId: string;
}

const SaveJobButton = ({ candidateId, jobId }: IButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveJobToggle = async (logddedIncandidateId: string, jobId: string) => {
    setIsLoading(true);

    // console.log(candidateId, logddedIncandidateId == "");

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
    <Button
      onClick={() => handleSaveJobToggle(candidateId, jobId)}
      disabled={isLoading}
      variant="ghost"
      className="mb-6 w-full cursor-pointer"
    >
      {isLoading ? <Spinner /> : <Heart size={16} />}
      {isLoading ? "saving..." : "save job"}
    </Button>
  );
};
export default SaveJobButton;
