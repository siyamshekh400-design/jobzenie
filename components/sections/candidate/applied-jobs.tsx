import { Application, appliedColumns } from "@/components/tables/applied-job/applied-job-column";
import { AppliedJobTable } from "@/components/tables/applied-job/applied-job-table";
import { SavedJobTable } from "@/components/tables/save-job-table";
import { IJob } from "@/database/job.model";
import { getAppliedJobs } from "@/lib/actions/application.action";
import { formatDate } from "@/lib/utils";
// import { savedJobs } from "@/constants/data";

interface IProps {
  candidateId?: string;
}

// type SavedJobWithCandidate = IJob & {
//   candidateId: string;
// };

const AppliedJobs = async ({ candidateId }: IProps) => {
  const { data } = await getAppliedJobs(candidateId as string);
  const myAppliedJobs = data?.applications || [];
  // console.log("🚀 ~ AppliedJobs ~ applications:", myAppliedJobs);

  const formattedJobs = myAppliedJobs.map((app) => {
    const job = app.job as IJob;
    return {
      id: app._id,
      jobId: job._id,
      title: job.title,
      companyName: job.companyName,
      location: job.location,
      salary: job.salary ? `$${job.salary.min}-$${job.salary.max}` : "N/A",
      appliedDate: formatDate(app.createdAt),
      status: app.status,
    };
  }) as Application[];
  return (
    <>
      <AppliedJobTable columns={appliedColumns} data={formattedJobs} />
    </>
  );
};
export default AppliedJobs;
