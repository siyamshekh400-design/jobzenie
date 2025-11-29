import { Suspense } from "react";

import AppliedJobs from "@/components/sections/candidate/applied-jobs";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { getServerSession } from "@/lib/get-session";

const CandiateAppliedJobsPage = async () => {
  const me = await getServerSession();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const candidateId = me?.user?.candidate;
  return (
    <>
      <h2 className="text-2xl font-semibold">Applied Jobs</h2>
      <Suspense fallback={<TableSkeleton />}>
        <AppliedJobs candidateId={candidateId} />
      </Suspense>
    </>
  );
};
export default CandiateAppliedJobsPage;
