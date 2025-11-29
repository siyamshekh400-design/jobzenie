import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListSkeletons() {
  return (
    <div className="w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="group mt-4 h-full cursor-pointer p-6 transition-shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* LEFT — Avatar + Info */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Avatar Skeleton */}
              <Skeleton className="h-12 w-12 rounded-full" />

              <div className="flex-1 space-y-3">
                {/* Name + Headline */}
                <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" /> {/* Name */}
                    <Skeleton className="h-3 w-56" /> {/* Headline */}
                  </div>
                </div>

                {/* Details (Location + Experience) */}
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <Skeleton className="h-3 w-32" /> {/* Location */}
                  <Skeleton className="h-3 w-24" /> {/* Experience */}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — View Profile Button */}
            <div className="flex flex-row-reverse items-center justify-between gap-3 md:flex-col md:items-end md:justify-start">
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
