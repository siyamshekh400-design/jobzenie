import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const JobGridSkeleton: React.FC = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={idx} className="p-6">
          <div className="space-y-4">
            {/* Job Title */}
            <Skeleton className="h-5 w-3/4 rounded" />
            {/* Company Name */}
            <Skeleton className="h-4 w-1/2 rounded" />

            {/* Location, Salary, Type */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-1/3 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
              <Skeleton className="h-3 w-1/4 rounded" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-10 rounded-full" />
            </div>

            {/* Apply Button */}
            <Skeleton className="mt-4 h-10 w-full rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
};
