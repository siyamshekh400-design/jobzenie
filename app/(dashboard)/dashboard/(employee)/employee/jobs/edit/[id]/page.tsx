import JobForm from "@/components/forms/employee/employee-job-form";
import { getJobById } from "@/lib/actions/job.action";
import { getServerSession } from "@/lib/get-session";

const EmployeeJobPostPage = async ({ params }: RouteParams) => {
  const me = await getServerSession();
  const { id } = await params;
  //   if (me?.session) redirect("/auth/sign-in");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const employeeId = me?.user?.employee;

  const { error, data } = await getJobById(id);
  if (error) <div>{error.message}</div>;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Update job posts</h2>
      {/* Job Form */}
      <JobForm formType="update" jobId={id || ""} mongoData={data?.job} employeeId={employeeId} />
    </>
  );
};
export default EmployeeJobPostPage;
