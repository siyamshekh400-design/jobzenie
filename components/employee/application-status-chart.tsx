"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ApplicationStatusBreakdown } from "@/types/employee-dashboard";

interface ApplicationStatusChartProps {
  data: ApplicationStatusBreakdown[] | undefined;
}

export function ApplicationStatusChart({ data }: ApplicationStatusChartProps) {
  const chartData = data?.map((item) => ({
    name: item._id
      .split(/(?=[A-Z])/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    count: item.count,
  }));

  // Chart config defines color tokens for statuses
  const chartConfig: ChartConfig =
    data?.reduce((acc, item, index) => {
      const chartColor = `var(--chart-${(index % 5) + 1})`;
      acc[item._id] = { label: item._id, color: chartColor };
      return acc;
    }, {} as ChartConfig) || {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status Distribution</CardTitle>
        <CardDescription>Breakdown of all applications by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent labelKey="count" nameKey="name" />} />
              <Bar dataKey="count" radius={4}>
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig?.[entry.name]?.color || "var(--chart-1)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
