import { redirect } from "next/navigation";

import { ApplicationsPerJobChart } from "@/components/employee/application-per-job-chart";
import { ApplicationStatusChart } from "@/components/employee/application-status-chart";
import { JobStatusChart } from "@/components/employee/job-status-chart";
import { RecentApplications } from "@/components/employee/recent-applications";
import { StatCard } from "@/components/employee/stat-card";
import { getEmployeeDashboardStats } from "@/lib/actions/employee.action";
import { getServerSession } from "@/lib/get-session";

const EmployeeDashboardPage = async () => {
  const me = await getServerSession();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const employeeId = me?.user?.employee;
  if (!employeeId) {
    redirect("/auth/sign-in");
  }
  const { data } = await getEmployeeDashboardStats(employeeId);
  const stats = data?.stats;
  const barChartData = data?.barChartData;
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your job postings and applications</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Jobs"
            value={stats?.totalJobs}
            iconName={"book-open"}
            description="Active and closed positions"
          />
          <StatCard
            title="Total Applications"
            value={stats?.totalApplications}
            iconName={"briefcase"}
            description="Across all positions"
          />
          <StatCard
            title="Open Positions"
            value={stats?.jobStatusBreakdown.find((s) => s._id === "open")?.count || 0}
            iconName={"lock-open"}
            description="Currently recruiting"
          />
          <StatCard
            title="Filled Positions"
            value={stats?.jobStatusBreakdown.find((s) => s._id === "filled")?.count || 0}
            iconName={"ticket-minus"}
            description="Successfully hired"
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <JobStatusChart data={stats?.jobStatusBreakdown} />
          <ApplicationStatusChart data={stats?.applicationStatusBreakdown} />
        </div>

        <div className="mb-8">
          <ApplicationsPerJobChart data={barChartData} />
        </div>

        <RecentApplications applications={stats?.recentApplications} />
      </div>
    </div>
  );
};
export default EmployeeDashboardPage;
