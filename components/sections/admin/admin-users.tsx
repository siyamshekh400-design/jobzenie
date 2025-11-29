"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AddUserSheet } from "@/components/admin/add-user-sheet";
import { adminUserColumns } from "@/components/tables/admin-user-table/admin-user-column";
import { AdminUsersTable } from "@/components/tables/admin-user-table/admin-users-table";
import { Button } from "@/components/ui/button";
import { createNewUser } from "@/lib/actions/admin.action";
import { User } from "@/lib/auth";
import { AdminUserCreateValues } from "@/lib/validations/admin.validate";

interface IAdminUserProps {
  users: User[];
}

const AdminUsers = ({ users }: IAdminUserProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddUser = async (newUser: AdminUserCreateValues) => {
    setIsLoading(true);
    try {
      const { success, message, error } = await createNewUser(newUser);
      if (success) {
        toast.success(message);
        setOpen(false);
        setIsLoading(false);
      } else {
        setOpen(false);
        setIsLoading(false);
        toast.error(error?.message || "Failed to create user");
      }
    } catch (error) {
      setOpen(false);
      setIsLoading(false);
      console.error("Error adding user:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage system users</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>
      <AdminUsersTable columns={adminUserColumns} data={users} />
      <AddUserSheet isLoading={isLoading} open={open} onOpenChange={setOpen} onAddUser={handleAddUser} />
    </>
  );
};
export default AdminUsers;
