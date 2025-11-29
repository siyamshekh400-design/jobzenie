"use client";

import { PieChart, Pie, Cell } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { JobStatusBreakdown } from "@/types/employee-dashboard";

// ✅ CHART CONFIG (ShadCN Required)
const chartConfig = {
  open: {
    label: "Open",
    color: "var(--chart-1)",
  },
  closed: {
    label: "Closed",
    color: "var(--chart-2)",
  },
  filled: {
    label: "Filled",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface JobStatusChartProps {
  data: JobStatusBreakdown[] | undefined;
}

export function JobStatusChart({ data }: JobStatusChartProps) {
  const chartData =
    data?.map((item) => ({
      status: item._id, // key for config + legend
      value: item.count,
      fill: `var(--color-${item._id})`, // ✅ AUTO COLOR FROM CONFIG
    })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Status Breakdown</CardTitle>
        <CardDescription>Distribution of job postings by status</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto min-h-[300px] max-w-[300px]">
          <PieChart accessibilityLayer>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              outerRadius={110}
              label={({ name, value }) => `${chartConfig[name as keyof typeof chartConfig]?.label}: ${value}`}
            >
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Pie>

            {/* ✅ SHADCN TOOLTIP */}
            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />

            {/* ✅ SHADCN LEGEND */}
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
