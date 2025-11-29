/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from "next/navigation";

import { CandidateProfileForm } from "@/components/forms/candidate/candidate-profile-form";
import { EmployeeProfileForm } from "@/components/forms/employee/employee-profile-form";
import { getServerSession } from "@/lib/get-session";

const ProfileOnBoardingPage = async () => {
  const me = await getServerSession();
  //@ts-ignore
  if (me?.user?.candidate || me?.user?.employee) {
    redirect("/");
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-lg p-7">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-2xl font-semibold">
          Complete your{" "}
          {
            //@ts-ignore
            me?.user?.accountType
          }{" "}
          profile
        </h2>
        <>
          {
            //@ts-ignore
            me?.user?.accountType === "candidate" && (
              <CandidateProfileForm
                name={me.user.name}
                email={me.user.email}
                userMongoId={me.user.id}
                //@ts-ignore
                accountType={me?.user?.accountType}
                formType="create"
                onBoarding
              />
            )
          }

          {
            //@ts-ignore
            me?.user?.accountType === "employee" && (
              <EmployeeProfileForm
                name={me.user.name}
                email={me.user.email}
                userMongoId={me.user.id}
                //@ts-ignore
                accountType={me?.user?.accountType}
                // formType="create"
                onBoarding
              />
            )
          }
        </>
      </div>
    </section>
  );
};
export default ProfileOnBoardingPage;
