"use client";

import { Users, Briefcase, FileText, Send } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AdminDashboardStats } from "@/lib/actions/admin.action";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard = ({ title, value, icon: Icon, description }: any) => (
  <Card className="bg-card border-border">
    <CardContent>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
          <p className="text-muted-foreground mt-1 text-xs">{description}</p>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <Icon className="text-primary h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface IDasboardProps {
  data: AdminDashboardStats | undefined;
}

export default function AdminDashboard({ data }: IDasboardProps) {
  const jobStatusData = data?.jobsByStatus.map((item) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
  }));

  const applicationStatusData = data?.applicationsByStatus.map((item) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
  }));

  const topJobsData = data?.topJobs.map((job, index) => ({
    name: job.title.substring(0, 15) + "...",
    applications: job.applicationsCount,
    fullTitle: job.title,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  return (
    <div className="bg-background min-h-screen">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s your recruitment platform overview.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Candidates"
            value={data?.totalCandidates}
            icon={Users}
            description="Active registered users"
          />
          <StatCard
            title="Total Employers"
            value={data?.totalEmployers}
            icon={Briefcase}
            description="Company accounts"
          />
          <StatCard title="Total Jobs" value={data?.totalJobs} icon={FileText} description="Job postings" />
          <StatCard
            title="Total Applications"
            value={data?.totalApplications}
            icon={Send}
            description="Submitted applications"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Jobs by Status */}
          <Card className="bg-card border-border w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Jobs by Status</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Distribution of job postings</CardDescription>
            </CardHeader>

            <CardContent className="p-3 sm:p-6">
              <ChartContainer
                config={{
                  open: { label: "Open", color: "var(--chart-1)" },
                  closed: { label: "Closed", color: "var(--chart-2)" },
                  filled: { label: "Filled", color: "var(--chart-3)" },
                }}
                className="h-[220px] w-full sm:h-[260px] lg:h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      dataKey="value"
                      // ✅ Responsive radius
                      outerRadius="70%"
                      // ✅ Smaller labels on mobile
                      label={({ name, value }) => (typeof value === "number" && value > 0 ? `${name}: ${value}` : "")}
                    >
                      {jobStatusData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Applications by Status */}
          <Card className="bg-card border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base sm:text-lg">Application Funnel</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Applications across different stages</CardDescription>
            </CardHeader>

            <CardContent className="h-[260px] w-full sm:h-80">
              <ChartContainer
                config={{
                  submitted: { label: "Submitted", color: "var(--chart-1)" },
                  reviewed: { label: "Reviewed", color: "var(--chart-2)" },
                  interviewing: { label: "Interviewing", color: "var(--chart-3)" },
                  offered: { label: "Offered", color: "var(--chart-4)" },
                  rejected: { label: "Rejected", color: "var(--chart-5)" },
                  withdrawn: { label: "Withdrawn", color: "var(--chart-1)" },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationStatusData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

                    {/* ✅ Responsive X Axis */}
                    <XAxis
                      dataKey="name"
                      interval={0}
                      angle={-30}
                      textAnchor="end"
                      height={50}
                      tick={{ fontSize: 10 }}
                    />

                    {/* ✅ Clean Y Axis */}
                    <YAxis tick={{ fontSize: 11 }} />

                    {/* ✅ Tooltip Safe on Mobile */}
                    <Tooltip content={<ChartTooltipContent />} />

                    {/* ✅ Responsive Bars */}
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} className="fill-chart-2" barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top Jobs */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base sm:text-lg">Top Jobs by Applications</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Most applied positions</CardDescription>
            </CardHeader>

            {/* ✅ RESPONSIVE HEIGHT */}
            <CardContent className="h-[260px] w-full sm:h-[330px]">
              <ChartContainer
                config={{
                  applications: { label: "Applications", color: "var(--chart-1)" },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topJobsData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

                    {/* ✅ RESPONSIVE X AXIS */}
                    <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />

                    {/* ✅ RESPONSIVE Y AXIS */}
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />

                    {/* ✅ MOBILE-SAFE TOOLTIP */}
                    <Tooltip content={<ChartTooltipContent />} />

                    {/* ✅ RESPONSIVE BAR SIZE */}
                    <Bar dataKey="applications" radius={[0, 6, 6, 0]} barSize={22} className="fill-chart-4" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Platform metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Avg Applications per Job</span>
                  <span className="font-bold">
                    {Math.round((data?.totalApplications ?? 0) / Math.max(data?.totalJobs ?? 1, 1))}
                  </span>
                </div>
                <div className="bg-muted h-2 w-full rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Open Positions</span>
                  <span className="font-bold">{data?.jobsByStatus.find((j) => j._id === "open")?.count || 0}</span>
                </div>
                <div className="bg-muted h-2 w-full rounded-full">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "51%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Filled Positions</span>
                  <span className="font-bold">{data?.jobsByStatus.find((j) => j._id === "filled")?.count || 0}</span>
                </div>
                <div className="bg-muted h-2 w-full rounded-full">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "16%" }} />
                </div>
              </div>

              <div className="border-border border-t pt-4">
                <p className="text-muted-foreground text-xs">Last updated: just now</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
