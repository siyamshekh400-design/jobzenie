"use client";

import { FileText, Bookmark, TrendingUp, User } from "lucide-react";
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

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateDashboardStats } from "@/types/action";

// Format data for bar chart

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f97316"];

// Status badge variant
const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { color: string; bg: string }> = {
    submitted: { color: "bg-blue-100 text-blue-800", bg: "bg-blue-50" },
    reviewed: { color: "bg-purple-100 text-purple-800", bg: "bg-purple-50" },
    interviewing: { color: "bg-pink-100 text-pink-800", bg: "bg-pink-50" },
    offered: { color: "bg-emerald-100 text-emerald-800", bg: "bg-emerald-50" },
    rejected: { color: "bg-orange-100 text-orange-800", bg: "bg-orange-50" },
    withdrawn: { color: "bg-gray-100 text-gray-800", bg: "bg-gray-50" },
  };

  const config = statusConfig[status] || statusConfig.submitted;
  return config.color;
};

interface IDashboardProps {
  data: CandidateDashboardStats | undefined;
}

export default function CandidateDashboard({ data }: IDashboardProps) {
  const statusChartData = [
    { name: "Submitted", value: data?.applicationStatusBreakdown?.submitted },
    { name: "Reviewed", value: data?.applicationStatusBreakdown?.reviewed },
    { name: "Interviewing", value: data?.applicationStatusBreakdown?.interviewing },
    { name: "Offered", value: data?.applicationStatusBreakdown?.offered },
    { name: "Rejected", value: data?.applicationStatusBreakdown?.rejected },
  ];
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">Candidate Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back! Here&apos;s your job application overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Total Applications Card */}
          <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{data?.totalApplications || 0}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Jobs applied</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </CardContent>
          </Card>

          {/* Saved Jobs Card */}
          <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Saved Jobs</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{data?.savedJobsCount || 0}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">To apply later</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
                <Bookmark className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
            </CardContent>
          </Card>

          {/* Profile Strength Card */}
          <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Profile Strength</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{data?.profileStrength || 0}%</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Complete profile</p>
              </div>
              <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              </div>
            </CardContent>
          </Card>

          {/* Interviewing Card */}
          <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Interviewing</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {data?.applicationStatusBreakdown.interviewing || 0}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">In progress</p>
              </div>
              <div className="rounded-lg bg-pink-100 p-3 dark:bg-pink-900">
                <User className="h-6 w-6 text-pink-600 dark:text-pink-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Bar Chart */}
          <Card className="border-0 shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle>Application Status Distribution</CardTitle>
              <CardDescription>Overview of your applications by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Status Breakdown</CardTitle>
              <CardDescription>Percentage distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your last 5 job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentApplications && data?.recentApplications?.length > 0
                ? data?.recentApplications?.map((app) => (
                    <div key={String(app._id)} className="flex items-center justify-between rounded-lg p-4">
                      <div className="flex-1">
                        <p className="font-semibold">{app?.job?.title}</p>
                        <p className="text-sm">
                          {app?.job?.companyName as string} • {app?.job?.location}
                        </p>
                        <p className="mt-1 text-xs">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusBadge(app.status)}>
                        {app?.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                  ))
                : "No recent applications found."}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
