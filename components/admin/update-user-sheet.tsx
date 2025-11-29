"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import AdminCreateUserForm from "../forms/auth/admin-user-form";

interface AddUserSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddUser: (user: any) => void;
}

export function UpdateUserSheet({ open, onOpenChange, onAddUser }: AddUserSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update User</SheetTitle>
          <SheetDescription>Update the user account with the form below.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 p-2">
          <AdminCreateUserForm onSubmit={onAddUser} onClose={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
