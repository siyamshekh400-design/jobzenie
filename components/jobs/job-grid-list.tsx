import { MapPin, DollarSign, Clock } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllJobs } from "@/lib/actions/job.action";

export const JobGridList = async () => {
  const { data } = await getAllJobs({
    limit: 6,
  });

  //   console.log(data);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.jobs?.map((job, idx) => (
        <Link key={String(job._id)} href={`/jobs/${job._id}`}>
          <div className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <Card className="group border-border hover:border-primary/50 from-background to-card/50 h-full cursor-pointer border bg-linear-to-br p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="space-y-4">
                <div>
                  <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                    {job?.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                    {job?.companyName}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                    <MapPin size={16} />
                    {job?.location}
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                    <DollarSign size={16} />
                    {`$${job?.salary?.min}-${job?.salary?.max}`}
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                    <Clock size={16} />
                    {job?.jobType}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {job?.skillsRequired?.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="px-2 py-1 text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {job?.skillsRequired.length > 3 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {job?.skillsRequired.length - 3} + more
                    </Badge>
                  )}
                </div>

                <Button className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 mt-4 w-full bg-gradient-to-r">
                  Apply Now
                </Button>
              </div>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};
