"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { EmployeeBarChartData } from "@/types/employee-dashboard";

interface ApplicationsPerJobChartProps {
  data: EmployeeBarChartData[] | undefined;
}

export function ApplicationsPerJobChart({ data }: ApplicationsPerJobChartProps) {
  // Map data to chart format
  const chartData = data?.map((item) => ({
    name: item.jobTitle,
    applications: item.applications,
  }));

  // Generate chartConfig with dynamic colors
  const chartConfig: ChartConfig =
    data?.reduce((acc, item, index) => {
      const chartColor = `var(--chart-${(index % 5) + 1})`; // cycles through --chart-1 to --chart-5
      acc[item.jobTitle] = { label: item.jobTitle, color: chartColor };
      return acc;
    }, {} as ChartConfig) || {};

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Applications per Job</CardTitle>
        <CardDescription>Number of applications received for each job posting</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent labelKey="applications" nameKey="name" />} />
              <Bar dataKey="applications" radius={4}>
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig[entry.name]?.color || "var(--chart-1)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
