/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from "next/navigation";

import EmployeeProfileInfo from "@/components/employee/sections/employee-profile-info";
import { EmployeeProfileForm } from "@/components/forms/employee/employee-profile-form";
import { getEmployeeById } from "@/lib/actions/employee.action";
import { getServerSession } from "@/lib/get-session";

// Dummy Employee Data

export default async function EmployeeProfilePage() {
  // const employee = await getDummyEmployee();

  const me = await getServerSession();

  if (!me?.session) redirect("/auth/sign-in");

  //@ts-ignore

  //@ts-ignore
  const employeeId = me?.user?.employee as string;

  const { data } = await getEmployeeById(employeeId);

  return (
    <section className="space-y-8">
      {/* Display Employee Info */}
      <EmployeeProfileInfo employee={data?.employee} />

      {/* Update Form */}
      <EmployeeProfileForm
        formType="update"
        name={me?.user?.name}
        email={me?.user?.email}
        userMongoId={me?.user?.id}
        employee={data?.employee}
      />
    </section>
  );
}
