"use client";

import { Users, Briefcase, User, FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const stats: StatCard[] = [
  {
    icon: <Users className="h-6 w-6" />,
    label: "Total Users",
    value: 2543,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    label: "Total Jobs",
    value: 847,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: <User className="h-6 w-6" />,
    label: "Total Candidates",
    value: 1923,
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    label: "Total Employees",
    value: 456,
    color: "from-orange-500 to-orange-600",
  },
];

export function AnalyticsCard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/40 shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-muted-foreground text-sm font-medium">{stat.label}</CardTitle>
              <div className="bg-muted text-card-foreground rounded-lg p-2">{stat.icon}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-foreground text-3xl font-bold">{stat.value.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
