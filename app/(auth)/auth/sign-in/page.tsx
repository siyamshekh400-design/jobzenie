import { Briefcase, Mail } from "lucide-react";
import { redirect } from "next/navigation";

import Footer from "@/components/footer";
import SignInForm from "@/components/forms/auth/signin-form";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

export default async function LoginPage() {
  const data = await getServerSession();
  const user = data?.user as User;
  if (data?.session) {
    redirect("/");
  }
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left side - Branding */}
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  <Briefcase size={28} />
                </div>
                <h1 className="text-3xl font-bold">Jobsfiesta</h1>
              </div>
              <h2 className="mb-4 text-4xl font-bold">Welcome Back</h2>
              <p className="text-muted-foreground text-lg">Sign in to your account to continue your journey</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Briefcase className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Find Opportunities</h3>
                  <p className="text-muted-foreground text-sm">Browse thousands of job listings tailored to you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Connect with Companies</h3>
                  <p className="text-muted-foreground text-sm">Get noticed by top employers in your field</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <Card className="border-2">
            <h3 className="text-center text-2xl font-semibold">Sign In</h3>
            <SignInForm />
          </Card>
        </div>
      </div>
      <Footer />
    </section>
  );
}
