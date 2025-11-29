import { Briefcase } from "lucide-react";
import { Suspense } from "react";

import JobFilters from "@/components/jobs/job-filters";
import JobListings from "@/components/jobs/job-listings";
import ListSkeletons from "@/components/skeletons/list-skeleton";

export default async function JobsPage({ searchParams }: RouteParams) {
  const { search, location, jobType, skill, page, limit } = await searchParams;
  return (
    <section className="from-background to-card/30 min-h-screen bg-linear-to-b">
      {/* Animated header section */}
      <div className="border-border/50 relative overflow-hidden border-b py-12">
        <div className="from-primary/10 to-accent/10 absolute inset-0 bg-linear-to-r via-transparent" />
        <div className="bg-accent/20 animate-blob animation-delay-2000 absolute top-0 -right-40 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Briefcase className="text-primary" size={24} />
              </div>
              <h1 className="from-primary to-accent bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Find Your Next Job
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Browse thousands of job opportunities and find the perfect role for you
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <Suspense fallback={<ListSkeletons />}>
              <JobListings
                search={search}
                location={location}
                jobType={jobType}
                page={Number(page)}
                limit={Number(limit)}
                skill={skill}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
