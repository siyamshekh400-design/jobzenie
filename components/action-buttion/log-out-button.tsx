"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/auth.action";
// import { authClient } from "@/lib/auth-client";

const LogOutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const router = useRouter();

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const { error, success, message } = await logoutUser();
      if (success) {
        toast.success(message || "Logged out successfully");
        setIsLoading(false);
        // return router.replace("/auth/sign-in");
      } else {
        setIsLoading(false);
        toast.error(error?.message || "Logout failed");
      }
    } catch (error) {
      console.log("Logut error", error);
      setIsLoading(false);
      toast.error("Unknown Logut unsuccessfull");
    }
  };
  return (
    <Button disabled={isLoading} onClick={() => handleLogOut()} className="w-full">
      {isLoading ? "Logging Out..." : "Log Out"}
    </Button>
  );
};
export default LogOutButton;
