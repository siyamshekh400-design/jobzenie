"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { removeFromSavedCandidate } from "@/lib/actions/employee.action";

import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface IButtonProps {
  candidateId: string;
  employeeId: string;
}
const RemoveFavouriteButton = ({ candidateId, employeeId }: IButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleWishlistToggle = async (candidateId: string, employeeId: string) => {
    setIsLoading(true);

    try {
      const result = await removeFromSavedCandidate(candidateId, employeeId);

      if (!result.success) {
        throw new Error(result.error?.message ? `${result.status}: ${result.error?.message}` : "Failed to add");
      }
      toast.success("Candiate Removed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant={"destructive"} onClick={() => handleWishlistToggle(candidateId, employeeId)} disabled={isLoading}>
      {isLoading ? <Spinner /> : <Trash2 size={16} />}
    </Button>
  );
};
export default RemoveFavouriteButton;
