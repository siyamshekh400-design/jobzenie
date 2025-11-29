import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IRecentApplication } from "@/types/employee-dashboard";

interface RecentApplicationsProps {
  applications: IRecentApplication[] | undefined;
}

const statusColors: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  reviewed: "bg-purple-100 text-purple-800",
  interviewing: "bg-yellow-100 text-yellow-800",
  offered: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-100 text-gray-800",
};

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>Latest applications received from candidates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications?.map((app) => (
            <div
              key={app._id}
              className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{app.candidate.name}</p>
                <p className="text-muted-foreground text-sm">{app?.job?.title}</p>
                <p className="text-muted-foreground text-xs">{app?.candidate?.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={statusColors[app?.status]}>
                  {app?.status.charAt(0).toUpperCase() + app?.status.slice(1)}
                </Badge>
                <p className="text-muted-foreground text-xs whitespace-nowrap">
                  {new Date(app?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
