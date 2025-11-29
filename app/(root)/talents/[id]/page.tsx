import { MapPin, Download, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";

import TalentFovouriteButton from "@/components/action-buttion/talent-favourite-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCandidateById } from "@/lib/actions/candidate.action";
import { getServerSession } from "@/lib/get-session";
import { formatDate, getCompanyInitials } from "@/lib/utils";

export default async function TalentDetailsPage({ params }: RouteParams) {
  const { id } = await params;
  const { data } = await getCandidateById(id);
  const me = await getServerSession();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const employeeId = me?.user?.employee || "";

  const candidate = data?.candidate;
  // if (!candidate) return notFound();

  if (!candidate) {
    return (
      <section className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold">Talent not found</h1>
          <Button asChild>
            <Link href="/talents">Back to Talents</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              {/* Photo */}
              <Avatar className="border-primary/20 relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border-4">
                {candidate.photo?.url ? (
                  <AvatarImage src={candidate.photo.url} alt={candidate.name} />
                ) : (
                  <AvatarFallback>{getCompanyInitials(candidate.name)}</AvatarFallback>
                )}
              </Avatar>

              {/* Info */}
              <div className="grow">
                <h1 className="text-foreground mb-2 text-3xl font-bold">{candidate?.name}</h1>

                <p className="text-primary mb-3 text-xl font-semibold">{candidate?.headline}</p>
                <p className="text-muted-foreground mb-3 flex items-center gap-2">
                  <Briefcase size={16} />
                  {`${candidate?.yearOfExperience} experience`}
                </p>
                <div className="text-muted-foreground mb-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {candidate?.location?.state}, {candidate?.location?.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(candidate?.dateOfBirth)}</span>
                  </div>
                  <span className="capitalize">{candidate?.gender}</span>
                </div>
                <p className="text-foreground mb-4 leading-relaxed">{candidate?.bio}</p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  {candidate?.resume?.url && (
                    <Link
                      href={candidate.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none"
                    >
                      <Button className="w-full gap-2 sm:w-auto">
                        <Download size={16} />
                        Download Resume
                      </Button>
                    </Link>
                  )}
                  <TalentFovouriteButton candidateId={String(candidate?._id)} employeeId={employeeId} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        {candidate?.skills.length > 0 && (
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate?.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
                {/* {remainingSkills.length > 0 && <Badge>{remainingSkills.length} +more</Badge>} */}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience Section */}
        {candidate?.experience.length > 0 && (
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidate?.experience.map((exp) => (
                <div key={String(exp._id)} className="border-primary/30 border-l-4 py-2 pl-4 md:pl-6">
                  <div className="mb-1 flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-2">
                    <h3 className="text-foreground text-lg font-semibold">{exp.position}</h3>
                    <span className="text-muted-foreground text-sm whitespace-nowrap">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-primary mb-2 font-medium">{exp.company}</p>
                  {exp.description && <p className="text-foreground/80 text-sm">{exp.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Education Section */}
        {candidate?.education.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidate?.education.map((edu) => (
                <div key={String(edu._id)} className="border-primary/30 border-l-4 py-2 pl-4 md:pl-6">
                  <div className="mb-1 flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-2">
                    <h3 className="text-foreground text-lg font-semibold">{edu.degree}</h3>
                    <span className="text-muted-foreground text-sm whitespace-nowrap">
                      {formatDate(edu.graduationYear)}
                    </span>
                  </div>
                  <p className="text-primary mb-1 font-medium">{edu.institution}</p>
                  <p className="text-foreground/80 text-sm">{edu.fieldOfStudy}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
