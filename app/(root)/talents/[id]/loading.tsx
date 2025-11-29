import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateDetailsLoading() {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Skeleton */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <Avatar className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border-4">
                <AvatarFallback>
                  <Skeleton className="h-32 w-32 rounded-lg" />
                </AvatarFallback>
              </Avatar>

              <div className="grow space-y-3">
                <Skeleton className="h-8 w-3/4 rounded" />
                <Skeleton className="h-6 w-1/2 rounded" />

                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>

                <Skeleton className="h-16 w-full rounded" />
                <Skeleton className="h-10 w-40 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Skeleton */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-20 rounded" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Skeleton */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-2 border-l-4 pl-4">
                <Skeleton className="h-6 w-1/2 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Skeleton */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-2 border-l-4 pl-4">
                <Skeleton className="h-6 w-1/2 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
