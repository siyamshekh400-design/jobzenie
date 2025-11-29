"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

interface IDeleteIdProps {
  accountId: string | undefined;
}
const DeleteAccountButton = ({ accountId }: IDeleteIdProps) => {
  const router = useRouter();
  const handleDeleteAccount = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message);
      }

      return router.push("/auth/sign-in");
    } catch (error) {
      console.log("Logut error", error);
      toast.error("Unknown Logut unsuccessfull");
    }
  };
  return (
    <Button onClick={() => handleDeleteAccount()} variant="destructive" size="sm">
      Delete Account
    </Button>
  );
};
export default DeleteAccountButton;
