"use client";
import { Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ActionButton } from "../ui/action-button";

interface IDeleteIdProps {
  accountId: string | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeleteAccountSection = ({ accountId }: IDeleteIdProps) => {
  const handleDelete = async () => {
    // do if in userver side
    // await authClient.deleteUser();
    return {
      success: true,
    };
  };
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Delete Account</CardTitle>
        <CardDescription>Permanently remove your account and all associated data.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="border-border flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className="bg-destructive/10 text-destructive border-destructive/30 rounded-full border p-2">
              <Trash2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">Delete Your Account</p>
              <p className="text-muted-foreground text-sm">This action cannot be undone.</p>
            </div>
          </div>

          <ActionButton
            areYouSureDescription="Are You Sure You Want to Delete This Account !"
            requireAreYouSure
            variant={"destructive"}
            action={() => handleDelete()}
          >
            Delete Account
          </ActionButton>
        </div>
      </CardContent>
    </Card>
  );
};
export default DeleteAccountSection;
