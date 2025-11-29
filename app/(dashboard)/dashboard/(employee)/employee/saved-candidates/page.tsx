import { Suspense } from "react";

import SavedTalentsLists from "@/components/employee/sections/saved-talent-list";
import ListSkeletons from "@/components/skeletons/list-skeleton";
import { getServerSession } from "@/lib/get-session";

const EmployeeSavedPostsPage = async () => {
  const me = await getServerSession();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const employee = me.user.employee;
  return (
    <>
      <h2 className="text-2xl font-semibold">Saved Candiates</h2>
      <Suspense fallback={<ListSkeletons />}>
        <SavedTalentsLists employeeId={employee} />
      </Suspense>
    </>
  );
};
export default EmployeeSavedPostsPage;
