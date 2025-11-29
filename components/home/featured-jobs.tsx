import Link from "next/link";
import { Suspense } from "react";

import { JobGridList } from "@/components/jobs/job-grid-list";
import { JobGridSkeleton } from "@/components/skeletons/job-grid-skeleton";
import { Button } from "@/components/ui/button";

// const mockJobs = [
//   {
//     id: 1,
//     title: "Senior Product Designer",
//     company: "TechCorp",
//     location: "San Francisco, CA",
//     salary: "$120k - $150k",
//     type: "Full-time",
//     tags: ["Design", "UI/UX", "Remote"],
//   },
//   {
//     id: 2,
//     title: "Full Stack Developer",
//     company: "StartupXYZ",
//     location: "New York, NY",
//     salary: "$100k - $130k",
//     type: "Full-time",
//     tags: ["React", "Node.js", "Full Stack"],
//   },
//   {
//     id: 3,
//     title: "Data Scientist",
//     company: "DataInc",
//     location: "Remote",
//     salary: "$110k - $140k",
//     type: "Full-time",
//     tags: ["Python", "ML", "Remote"],
//   },
//   {
//     id: 4,
//     title: "Product Manager",
//     company: "InnovateCo",
//     location: "Boston, MA",
//     salary: "$130k - $160k",
//     type: "Full-time",
//     tags: ["Product", "Strategy", "Hybrid"],
//   },
//   {
//     id: 5,
//     title: "DevOps Engineer",
//     company: "CloudSystems",
//     location: "Austin, TX",
//     salary: "$105k - $135k",
//     type: "Full-time",
//     tags: ["AWS", "Docker", "Kubernetes"],
//   },
//   {
//     id: 6,
//     title: "Marketing Specialist",
//     company: "BrandStudio",
//     location: "Los Angeles, CA",
//     salary: "$70k - $90k",
//     type: "Full-time",
//     tags: ["Marketing", "Content", "SEO"],
//   },
// ];

export default async function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div className="animate-fade-in">
            <h2 className="from-primary to-accent mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Featured Jobs
            </h2>
            <p className="text-muted-foreground">Exciting opportunities from top companies</p>
          </div>
          <Button variant="outline" asChild className="hover:bg-primary/10 hidden bg-transparent md:flex">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>

        <div className="">
          <Suspense fallback={<JobGridSkeleton />}>
            <JobGridList />
          </Suspense>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button size="lg" asChild className="from-primary to-accent bg-gradient-to-r">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
