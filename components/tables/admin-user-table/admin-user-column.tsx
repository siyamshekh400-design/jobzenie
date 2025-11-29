import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2, Lock } from "lucide-react";

import AdminResetPasswordForm from "@/components/forms/auth/admin-reset-password";
import AdminUpdateUserForm from "@/components/forms/auth/admin-update-user-form";
import { ActionButton } from "@/components/ui/action-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUserByAdmin } from "@/lib/actions/admin.action";
import { User } from "@/lib/auth";

// type User = {
//   id: string;
//   email: string;
//   name: string;
//   password?: string;
//   image?: string | null;
//   role: "admin" | "user";
//   candidate?: string | null;
//   employee?: string | null;
//   accountType?: "candidate" | "employee";
// };

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800";
    case "user":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const adminUserColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original?.role ?? "N/A";

      return <Badge className={getRoleColor(role)}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
    },
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
    cell: ({ row }) => row.original.accountType || "—",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      // const isAdmin = user.role === "admin";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            {/* ✅ Update User */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="mr-2 h-4 w-4" /> Update User
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update User</DialogTitle>
                </DialogHeader>
                <AdminUpdateUserForm data={user} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Lock className="mr-2 h-4 w-4" /> Reset Password
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                </DialogHeader>
                <AdminResetPasswordForm userId={user.id} />
              </DialogContent>
            </Dialog>

            {/* ✅ Delete User */}
            <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
              <ActionButton
                action={() => deleteUserByAdmin(user.id)}
                variant="destructive"
                requireAreYouSure
                areYouSureDescription="Do you want to delete this user? This action cannot be undone."
                className="w-full justify-start bg-transparent"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete User
              </ActionButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
