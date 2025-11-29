import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import EmployeeJobs from "@/components/employee/sections/employe-job";
import JobListSkeleton from "@/components/skeletons/job-list-skeleton";
import { Button } from "@/components/ui/button";

const EmployeeJobsPage = async () => {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <h1 className="mb-4 text-2xl font-semibold">All Posted Jobs</h1>
        <Button>
          <Link href="/dashboard/employee/jobs/new">Post Job</Link>
          <ArrowRight />
        </Button>
      </div>
      <Suspense fallback={<JobListSkeleton />}>
        <EmployeeJobs />
      </Suspense>
    </>
  );
};

export default EmployeeJobsPage;
