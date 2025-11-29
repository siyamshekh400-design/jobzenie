// import ApplicationTable from "@/components/tables/job-application-table";
import { Suspense } from "react";

import EmployJobCandiateList from "@/components/employee/sections/employe-job-candidates-list";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const ApplicatonsPage = async ({ params }: RouteParams) => {
  const { id } = await params;

  return (
    <>
      <h2>Candidate Applied on job </h2>
      {/* <ApplicationTable /> */}
      <Suspense fallback={<TableSkeleton />}>
        <EmployJobCandiateList jobId={id || ""} />
      </Suspense>
    </>
  );
};
export default ApplicatonsPage;
