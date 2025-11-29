import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex gap-4">
          {/* Company Logo */}
          <Skeleton className="h-16 w-16 rounded-lg" />

          {/* Job Title and Company */}
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-3/4 rounded" />
            <Skeleton className="h-5 w-1/2 rounded" />

            {/* Location / Salary / Job Type */}
            <div className="mt-2 flex flex-wrap gap-3">
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-20 rounded" />
          ))}
        </div>

        {/* Info Bar */}
        <div className="flex gap-4 text-sm">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 gap-8 px-4 lg:grid-cols-3 lg:px-8">
        {/* Left Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* About this job */}
          <Card className="space-y-4 p-8">
            <Skeleton className="h-6 w-48 rounded" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-full rounded" />
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className="space-y-4 p-8">
            <Skeleton className="h-6 w-36 rounded" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded" />
              ))}
            </div>
          </Card>

          {/* About Company */}
          <Card className="space-y-4 p-8">
            <Skeleton className="h-6 w-64 rounded" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-full rounded" />
              ))}
            </div>
            <Skeleton className="mt-4 h-10 w-40 rounded" />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:col-span-1">
          <Card className="sticky top-20 space-y-4 p-6">
            <Skeleton className="h-12 w-full rounded" />
            <Skeleton className="h-12 w-full rounded" />
            <div className="space-y-2 pt-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded" />
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Similar Jobs */}
      <div className="mt-16 space-y-6 px-4 pt-8 lg:px-8">
        <Skeleton className="h-8 w-64 rounded" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="space-y-2 p-6">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="mt-2 h-6 w-full rounded" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
