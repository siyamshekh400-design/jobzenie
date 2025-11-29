"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { addToSavedCandidate } from "@/lib/actions/employee.action";

import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
interface IButtonProps {
  candidateId: string;
  employeeId: string;
}

const TalentFovouriteButton = ({ candidateId, employeeId }: IButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async (candidateId: string, employeeId: string) => {
    setIsLoading(true);

    try {
      toast.promise(
        (async () => {
          const result = await addToSavedCandidate(candidateId, employeeId);

          if (!result.success) {
            throw new Error(result.error?.message ? `${result.status}: ${result.error?.message}` : "Failed to add");
          }

          setIsLoading(false);
          return result;
        })(),
        {
          loading: "Adding to list...",
          success: "Talents added to list!",
          error: (err) => err.message || "Failed to add book",
        }
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={() => handleWishlistToggle(candidateId, employeeId)}
      disabled={isLoading}
      className="w-full cursor-pointer gap-2 sm:w-auto"
    >
      {isLoading ? <Spinner /> : <Heart size={16} />}
      {isLoading ? "Adding..." : "Favourite"}
    </Button>
  );
};
export default TalentFovouriteButton;
