import { Suspense } from "react";

import SavedJobs from "@/components/sections/candidate/saved-jobs";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { getServerSession } from "@/lib/get-session";

const CandiateSaveJobsPage = async () => {
  const me = await getServerSession();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const candidateId = me?.user?.candidate;
  return (
    <>
      <h2 className="text-2xl font-semibold">Saved Jobs</h2>
      <Suspense fallback={<TableSkeleton />}>
        <SavedJobs candidateId={candidateId} />
      </Suspense>
    </>
  );
};
export default CandiateSaveJobsPage;
