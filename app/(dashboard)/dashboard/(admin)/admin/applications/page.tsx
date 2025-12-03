import { Suspense } from "react";

import AdminApplications from "@/components/sections/admin/admin-application";
import TableSkeleton from "@/components/skeletons/table-skeleton";

export default async function AdminApplicationsPage() {
  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">Application Review Center</h1>
          <p className="text-muted-foreground">Review and approve/reject job applications from candidates</p>
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <AdminApplications />
        </Suspense>
      </div>
    </div>
  );
}
