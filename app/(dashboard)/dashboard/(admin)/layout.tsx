import { redirect } from "next/navigation";
import React from "react";

// import ProfileAvatar from "@/components/shared/ProfileAvatar";
import { AdminDashboardSidebar } from "@/components/admin/admin-sidebar";
import ProfileMenu from "@/components/shared/profile-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

const AdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const me = await getServerSession();
  const user = me?.user as User;
  if (!user || user.role !== "admin") {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      <section className="w-full">
        <div className="relative">
          <div className="sticky flex items-center justify-between px-6 py-4">
            <SidebarTrigger />
            <div className="flex items-center justify-between gap-x-4">
              {/* <ProfileAvatar /> */}
              <ProfileMenu
                name={user?.name}
                email={user.email}
                image={user?.image as string}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                role={(user as any)?.role}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                accountType={(user as any)?.accountType}
              />
            </div>
          </div>
        </div>
        <section className="flex w-full flex-1 flex-col items-center justify-center px-6 pt-16 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </section>
      </section>
    </SidebarProvider>
  );
};
export default AdminDashboardLayout;
