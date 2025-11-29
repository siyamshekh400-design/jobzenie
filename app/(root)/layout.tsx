import React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getServerSession();
  const user = data?.user as User;
  return (
    <section className="bg-background min-h-screen">
      <Header
        name={user?.name}
        email={user?.email}
        image={user?.image as string}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role={(user as any)?.role}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accountType={(user as any)?.accountType}
        isCandiateProfileCreated={user?.candidate ? true : false}
        isEmployeeProfileCreated={user?.employee ? true : false}
      />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
