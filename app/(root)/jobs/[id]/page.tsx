import { MapPin, DollarSign, Clock, Share2, Bookmark, Users, CheckCircle, Heart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import ApplyJobButton from "@/components/action-buttion/apply-job-button";
import SaveJobButton from "@/components/action-buttion/save-job-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getJobById } from "@/lib/actions/job.action";
import { getServerSession } from "@/lib/get-session";
import { formatDate, getCompanyInitials } from "@/lib/utils";

// const mockJobDetails: Record<string, any> = {
//   "1": {
//     id: 1,
//     title: "Senior Product Designer",
//     company: "TechCorp",
//     location: "San Francisco, CA",
//     salary: "$120k - $150k",
//     type: "Full-time",
//     tags: ["Design", "UI/UX", "Remote"],
//     company_logo: "TC",
//     postedDate: "2 days ago",
//     applications: 24,
//     views: 312,
//     description: `We're looking for an experienced Senior Product Designer to join our growing team. You'll work on designing innovative solutions that impact millions of users.

// Key Responsibilities:
// - Lead design strategy and vision for our products
// - Collaborate with cross-functional teams
// - Conduct user research and usability testing
// - Create wireframes, prototypes, and design specifications
// - Mentor junior designers

// Requirements:
// - 5+ years of product design experience
// - Expertise in Figma or similar design tools
// - Strong portfolio demonstrating product design work
// - Understanding of user-centered design principles
// - Excellent communication skills`,
//     benefits: [
//       "Competitive salary",
//       "Health insurance",
//       "401(k) matching",
//       "Flexible work hours",
//       "Remote work options",
//       "Professional development budget",
//     ],
//     about_company: "TechCorp is a leading technology company focused on creating innovative solutions.",
//   },
//   "2": {
//     id: 2,
//     title: "Full Stack Developer",
//     company: "StartupXYZ",
//     location: "New York, NY",
//     salary: "$100k - $130k",
//     type: "Full-time",
//     tags: ["React", "Node.js", "Full Stack"],
//     company_logo: "SX",
//     postedDate: "5 days ago",
//     applications: 18,
//     views: 245,
//     description: `Join StartupXYZ as a Full Stack Developer and help us build the future of web applications.`,
//     benefits: ["Competitive salary", "Equity options", "Unlimited PTO", "Team events"],
//     about_company: "StartupXYZ is a fast-growing startup in the tech space.",
//   },
// };

export default async function JobDetailsPage({ params }: RouteParams) {
  const { id } = await params;
  const { data } = await getJobById(id);
  const me = await getServerSession();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const candidateId = me?.user?.candidate;
  if (!data?.job) return notFound();

  const job = data.job || {};

  // const job = mockJobDetails[id];

  if (!job) {
    return (
      <section className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold">Job not found</h1>
          <Button asChild>
            <Link href="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="from-background to-card/30 min-h-screen bg-linear-to-b p-10">
      {/* Animated header background */}
      <div className="from-primary/5 pointer-events-none absolute inset-0 h-96 bg-linear-to-b via-transparent to-transparent" />

      {/* Header Section */}
      <div className="animate-fade-in relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex gap-4">
          <Avatar className="ring-primary/10 from-primary/20 to-accent/20 h-16 w-16 bg-linear-to-br ring-2">
            {job?.companyLogo?.url ? (
              <AvatarImage src={job.companyLogo.url} alt={job.companyName || "Company Logo"} />
            ) : (
              <AvatarFallback className="from-primary to-accent bg-linear-to-br bg-clip-text text-2xl font-bold text-transparent">
                {getCompanyInitials(job?.companyName) || "?"}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <h1 className="from-primary to-accent mb-2 bg-linear-to-r bg-clip-text text-5xl font-bold text-transparent">
              {job.title}
            </h1>
            <p className="text-muted-foreground mb-3 text-xl">{job?.companyName}</p>
            <div className="flex flex-wrap gap-3">
              <div className="text-muted-foreground bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                <MapPin size={18} /> {job.location}
              </div>
              <div className="text-muted-foreground bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                <DollarSign size={18} /> {job?.salary?.min}-{job?.salary?.max}
              </div>
              <div className="text-muted-foreground bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                <Clock size={18} /> {job.jobType}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-primary/10 hover:border-primary bg-transparent transition-all"
            >
              <Bookmark size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-primary/10 hover:border-primary bg-transparent transition-all"
            >
              <Share2 size={20} />
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {job?.skillsRequired?.map((tag: string, idx: number) => (
            <Badge
              key={idx}
              variant="secondary"
              className="from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 bg-linear-to-r transition-all"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-muted-foreground bg-card/50 border-border flex gap-4 rounded-lg border px-4 py-3 text-sm backdrop-blur">
          <span>Posted {formatDate(job.createdAt)}</span>
          <span className="flex items-center gap-1">
            <Users size={16} /> {job.countApplicatons || 0} applicants
          </span>
          {/* <span>{job.views} views</span> */}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* About this job */}
          <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">About this job</h2>
            <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none whitespace-pre-line">
              {job.description}
            </div>
          </Card>

          {/* Benefits */}
          {job?.benefits && job?.benefits.length > 0 && (
            <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
              <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Benefits</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {job?.benefits.map((benefit: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-primary/5 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors"
                  >
                    <CheckCircle size={20} className="text-primary shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* About Company */}
          <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">
              About {job.companyName}
            </h2>
            {job?.aboutCompany && <p className="text-muted-foreground mb-4">{job.aboutCompany}</p>}
            <Button variant="outline" className="hover:bg-primary/10 bg-transparent">
              Visit Company Page
            </Button>
          </Card>
        </div>

        {/* Sidebar - Apply Section */}
        <div className="lg:col-span-1">
          <Card className="from-primary/5 to-accent/5 border-primary/20 hover:border-primary/50 sticky top-20 border-2 bg-linear-to-br p-6 shadow-lg transition-all duration-300">
            <ApplyJobButton candidateId={candidateId as string} jobId={String(job?._id)} />
            <SaveJobButton candidateId={candidateId as string} jobId={String(job?._id)} />

            <div className="border-border/50 space-y-4 border-t pt-4">
              {[
                { label: "Job Type", value: job.jobType },
                { label: "Salary", value: `${job?.salary?.min}-${job?.salary?.min}` },
                { label: "Location", value: job.location },
                { label: "Posted", value: formatDate(job.createdAt) },
              ].map((item, idx) => (
                <div key={idx} className="bg-background/50 hover:bg-primary/5 rounded-lg p-3 transition-colors">
                  <div className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
                    {item.label}
                  </div>
                  <div className="text-foreground font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Similar Jobs */}
      {/* <div className="border-border/50 relative z-10 mt-16 border-t pt-8">
        <h2 className="from-primary to-accent mb-6 bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent">
          Similar Jobs
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="group from-background to-card/50 border-border hover:border-primary/50 cursor-pointer border bg-linear-to-br p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="group-hover:text-primary mb-2 font-semibold transition-colors">Similar Job {idx + 1}</h3>
              <p className="text-muted-foreground mb-4 text-sm">Company Name</p>
              <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
                <MapPin size={16} /> Location
              </div>
              <Button
                size="sm"
                className="from-primary/80 to-accent/80 hover:from-primary hover:to-accent w-full bg-linear-to-r"
              >
                View Job
              </Button>
            </Card>
          ))}
        </div>
      </div> */}
    </section>
  );
}
