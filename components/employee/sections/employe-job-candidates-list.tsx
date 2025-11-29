import { applicatonColumns } from "@/components/tables/applicaton-table/application-column";
import { ApplicatonCandidateTable } from "@/components/tables/applicaton-table/applicaton-table";
import { getCandidatesForJob } from "@/lib/actions/application.action";

const EmployJobCandiateList = async ({ jobId }: { jobId: string }) => {
  const { data } = await getCandidatesForJob(jobId);
  //   console.log("🚀 ~ ApplicatonsPage ~ data:", data?.candidates);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ApplicatonCandidateTable columns={applicatonColumns} data={data?.candidates as any} />;
};
export default EmployJobCandiateList;
