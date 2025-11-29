"use client";

import { Briefcase, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

import Footer from "@/components/footer";
import SignUpForm from "@/components/forms/auth/signup-form";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"candidate" | "employee">("candidate");
  const { data } = authClient.useSession();
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
          {/* Left side - Info */}
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  <Briefcase size={28} />
                </div>
                <h1 className="text-3xl font-bold">JobZenie</h1>
              </div>
              <h2 className="mb-4 text-4xl font-bold">Join JobZenie Today</h2>
              <p className="text-muted-foreground text-lg">Choose your path and unlock opportunities</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Users className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">For Candidates</h3>
                  <p className="text-muted-foreground text-sm">Find your dream job and grow your career</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Briefcase className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">For Employers</h3>
                  <p className="text-muted-foreground text-sm">Find and hire top talent for your team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <Card className="border-2 p-8">
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <Label className="mb-4 block text-base font-semibold">
                  I&apos;m a {accountType ? accountType : "..."}
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAccountType("candidate")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      accountType === "candidate"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold">Candidate</div>
                    <div className="text-muted-foreground text-xs">Looking for jobs</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("employee")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      accountType === "employee"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold">Employer</div>
                    <div className="text-muted-foreground text-xs">Hiring talents</div>
                  </button>
                </div>
              </div>

              <SignUpForm accountType={accountType} />
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </section>
  );
}
