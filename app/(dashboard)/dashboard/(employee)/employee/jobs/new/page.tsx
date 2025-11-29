import JobForm from "@/components/forms/employee/employee-job-form";
import { getServerSession } from "@/lib/get-session";

const EmployeeJobPostPage = async () => {
  const me = await getServerSession();
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Post a New Job</h2>
      {/* Job Form */}
      <JobForm
        formType="create"
        employeeId={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          me?.user.employee
        }
      />
    </>
  );
};
export default EmployeeJobPostPage;
