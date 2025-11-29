import { BookOpen, Briefcase, FileStack, FileText, MapPin, Plus, User } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import UploadImagButton from "@/components/action-buttion/upload-image-button";
import UploadPDFButton from "@/components/action-buttion/upload-pdf-button";
import { CandidateEducationForm } from "@/components/forms/candidate/candidate-education-form";
import { CandidateExperienceForm } from "@/components/forms/candidate/candidate-experience-form";
import { CandidateProfileForm } from "@/components/forms/candidate/candidate-profile-form";
import CandidateSkillForm from "@/components/forms/candidate/candidate-skill-from";
import { CandidateEducationDisplayList } from "@/components/sections/candidate/candidate-eduction";
import { CandidateExperienceDisplayList } from "@/components/sections/candidate/candidate-experiece";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCandidateProfileByUserId } from "@/lib/actions/candidate.action";
import { getServerSession } from "@/lib/get-session";

const CandidateProfilePage = async () => {
  const data = await getServerSession();
  const user = data?.user;
  if (!data?.session) redirect("/auth/sign-in");
  const { data: candidateData } = await getCandidateProfileByUserId(String(user?.id));
  const candidate = candidateData?.candidate;

  return (
    <>
      {/* Profile Summary Start */}
      <Card className="p-4 sm:p-6">
        {/* Top Section */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Avatar + Info */}
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src={candidate?.photo?.url || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-bold sm:text-2xl">{candidate?.name}</h1>
                <p className="text-muted-foreground text-sm sm:text-base">{candidate?.headline}</p>

                <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs sm:text-sm">
                  <MapPin size={14} /> {`${candidate?.location?.country},${candidate?.location?.state || ""}`}
                </p>
              </div>
              <UploadImagButton accountType={candidate?.accountType} loggedInUserId={String(candidate?.user)} />
            </div>
          </div>

          {/* Edit Button */}
          {/* <div className="flex w-full flex-col gap-3 md:w-auto">
            <Button className="w-full sm:w-auto md:hidden md:w-full lg:w-auto">
              <Camera size={24} />
              Upload Image
            </Button>
            <Button className="w-full sm:w-auto">Edit Profile</Button>
          </div> */}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-primary text-2xl font-bold sm:text-3xl">8</div>
            <div className="text-muted-foreground text-xs sm:text-sm">Applications</div>
          </div>

          <div className="text-center">
            <div className="text-primary text-2xl font-bold sm:text-3xl">12</div>
            <div className="text-muted-foreground text-xs sm:text-sm">Saved Jobs</div>
          </div>

          <div className="text-center">
            <div className="text-primary text-2xl font-bold sm:text-3xl">2</div>
            <div className="text-muted-foreground text-xs sm:text-sm">Interview Offers</div>
          </div>

          <div className="text-center">
            <div className="text-primary text-2xl font-bold sm:text-3xl">95%</div>
            <div className="text-muted-foreground text-xs sm:text-sm">Profile Completion</div>
          </div>
        </div>
      </Card>
      {/* Pofile Summary End */}

      {/* Profile Information */}
      <section className="mt-4">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <User size={18} className="mr-2" />
              <span className="hidden sm:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase size={18} className="mr-2" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen size={18} className="mr-2" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>

            <TabsTrigger value="skills" className="flex items-center gap-2">
              <FileStack size={16} />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Resume</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="space-y-6 border-0 p-6 shadow-lg sm:p-8">
              <div>
                <h3 className="text-foreground mb-6 text-xl font-bold">Basic Information</h3>
              </div>
              <CandidateProfileForm candidate={candidate} formType="update" userMongoId={String(candidate?.user)} />
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card className="space-y-6 border-0 p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0">
                <div>
                  <h3 className="text-xl font-bold">Work Experience</h3>
                  <p className="text-muted-foreground mt-1 text-sm">Add and manage your professional experience</p>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant={"outline"}>
                        <Plus size={24} />
                        Add Experience
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Experience</DialogTitle>
                      </DialogHeader>
                      <CandidateExperienceForm userId={user?.id} type="add" />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-6">
                <CandidateExperienceDisplayList
                  userId={String(candidate?.user)}
                  experiences={candidate?.experience || []}
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card className="space-y-6 border-0 p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0">
                <div>
                  <h3 className="text-xl font-bold">Education</h3>
                  <p className="text-muted-foreground mt-1 text-sm">Add your educational background</p>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant={"outline"}>
                        <Plus size={24} />
                        Add Educatoin
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Education</DialogTitle>
                      </DialogHeader>
                      <CandidateEducationForm type="add" userId={String(candidate?.user)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-6">
                <CandidateEducationDisplayList userId={String(candidate?.user)} educations={candidate?.education} />
              </div>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <Card className="p-8 text-center">
              <CandidateSkillForm userId={String(candidate?.user)} mongoSkills={candidate?.skills} />
            </Card>
          </TabsContent>
          {/* Resume Tab */}
          <TabsContent value="resume">
            <Card className="p-8 text-center">
              {/* If resume exists */}
              {candidate?.resume?.url ? (
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-lg font-semibold">Your Resume</h3>

                  {/* If PDF */}
                  {candidate.resume.url.endsWith(".pdf") ? (
                    <iframe src={candidate.resume.url} className="h-[400px] w-full rounded-md border"></iframe>
                  ) : (
                    /* If image (jpg, png, etc.) */
                    <Image src={candidate.resume.url} alt="Resume" className="w-full max-w-2xl rounded-md border" />
                  )}
                </div>
              ) : (
                /* If resume missing */
                <div className="flex flex-col items-center">
                  <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2 text-lg font-semibold">Resume Management</h3>
                  <p className="text-muted-foreground mb-4">Upload and manage your resume</p>
                </div>
              )}

              {/* Upload button always visible */}
              <UploadPDFButton accountType={candidate?.accountType} loggedInUserId={String(candidate?.user)} />
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};
export default CandidateProfilePage;
