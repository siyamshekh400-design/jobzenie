import { redirect } from "next/navigation";

import { getJobsByEmployeeId } from "@/lib/actions/job.action";
import { getServerSession } from "@/lib/get-session";

import EmployeeJobList from "./employee-job-list";
// const postedJobs = [
//   {
//     id: "1",
//     title: "Frontend Developer",
//     status: "active",
//     posted: "2 days ago",
//     location: "Remote",
//     salary: "$70k - $90k",
//     applications: 12,
//   },
//   {
//     id: "2",
//     title: "Backend Engineer",
//     status: "inactive",
//     posted: "1 week ago",
//     location: "New York",
//     salary: "$90k - $120k",
//     applications: 5,
//   },
// ];

const EmployeeJobs = async () => {
  const me = await getServerSession();
  if (!me?.session) redirect("/auth/sign-in");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const employeeId = me?.user?.employee;
  const { error, data } = await getJobsByEmployeeId(employeeId, {});
  if (error) {
    return <p className="text-muted-foreground py-6 text-center">{error.message}</p>;
  }

  const jobs = data?.jobs || [];

  if (!jobs || jobs?.length === 0) {
    return <p className="text-muted-foreground py-6 text-center">No jobs posted yet.</p>;
  }
  return (
    <>
      {jobs?.map((job) => (
        <EmployeeJobList key={String(job._id)} job={job} />
      ))}
    </>
  );
};
export default EmployeeJobs;
