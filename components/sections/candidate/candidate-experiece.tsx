"use client";

import { Pencil, Trash2 } from "lucide-react";

import { CandidateExperienceForm } from "@/components/forms/candidate/candidate-experience-form";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IExperience } from "@/database/candidate.model";
import { deleteExperienceFromCandidateProfile } from "@/lib/actions/candidate.action";
import { formatDate } from "@/lib/utils";

// type Experience = {
//   _id?: mongoose.Types.ObjectId;
//   position: string;
//   company: string;
//   startDate?: Date | undefined;
//   endDate?: Date | undefined;
//   description?: string;
// };

type ExperienceListProps = {
  experiences: IExperience[];
  userId?: string;
};

export function CandidateExperienceDisplayList({ experiences, userId }: ExperienceListProps) {
  return (
    <div className="space-y-4">
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div
            key={exp?._id ? exp?._id.toString() : `exp${index}`}
            className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-green-400/50"
          >
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-foreground text-sm font-semibold">Position</p>
                <p className="mt-1">{exp.position}</p>
              </div>

              <div>
                <p className="text-foreground text-sm font-semibold">Company</p>
                <p className="mt-1">{exp.company}</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-foreground text-sm font-semibold">Start Date</p>
                <p className="mt-1">{exp.startDate ? formatDate(exp.startDate) : "Not provided"}</p>
              </div>

              <div>
                <p className="text-foreground text-sm font-semibold">End Date</p>
                <p className="mt-1">{exp.endDate ? formatDate(exp.endDate) : "Till now"}</p>
              </div>
            </div>

            {exp.description && (
              <div className="mb-4">
                <p className="text-foreground text-sm font-semibold">Description</p>
                <p className="mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            )}

            <div className="flex gap-2">
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button type="button" size="default">
                      <Pencil size={14} /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Experience</DialogTitle>
                    </DialogHeader>
                    <CandidateExperienceForm
                      userId={String(userId)}
                      type="edit"
                      experience={exp}
                      experienceId={exp._id?.toString()}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <ActionButton
                action={() => deleteExperienceFromCandidateProfile(String(userId), String(exp?._id))}
                areYouSureDescription="This action cannot be undone."
                requireAreYouSure
                variant={"destructive"}
              >
                <Trash2 size={14} /> Delete
              </ActionButton>
            </div>
          </div>
        ))
      ) : (
        <div>Now experience added</div>
      )}
    </div>
  );
}
