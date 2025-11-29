import { redirect } from "next/navigation";

import CandidateDashboard from "@/components/candidate/candidate-dashboard";
import { getSingleCandidateStats } from "@/lib/actions/candidate.action";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

const CandidateDashboardPage = async () => {
  const me = await getServerSession();
  const user = me?.user as User;
  const candidateId = user?.candidate;
  // if (user) {
  //   redirect("/");
  // }
  const { data } = await getSingleCandidateStats(candidateId as string);

  return <CandidateDashboard data={data} />;
};
export default CandidateDashboardPage;
