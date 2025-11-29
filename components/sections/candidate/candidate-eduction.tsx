"use client";

import { Pencil, Trash2 } from "lucide-react";

import { CandidateEducationForm } from "@/components/forms/candidate/candidate-education-form";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IEducation } from "@/database/candidate.model";
import { deleteEducationFromCandidateProfile } from "@/lib/actions/candidate.action";
import { formatDate } from "@/lib/utils";

type EducationDisplayListProps = {
  educations?: IEducation[];
  userId?: string;
};

export function CandidateEducationDisplayList({ educations = [], userId }: EducationDisplayListProps) {
  return (
    <div className="space-y-4">
      {educations?.length > 0 ? (
        educations?.map((edu, idx) => (
          <div
            key={edu?._id ? edu?._id.toString() : `${edu._id}+${idx}`}
            className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-purple-400/50"
          >
            {/* Row 1 */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-foreground text-sm font-semibold">School/University</p>
                <p className="mt-1">{edu.institution}</p>
              </div>

              <div>
                <p className="text-foreground text-sm font-semibold">Degree</p>
                <p className="mt-1">{edu.degree}</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-foreground text-sm font-semibold">Field of Study</p>
                <p className="mt-1">{edu?.fieldOfStudy}</p>
              </div>

              <div>
                <p className="text-foreground text-sm font-semibold">Graduation Year</p>
                <p className="mt-1">{edu?.graduationYear ? formatDate(edu.graduationYear) : "Not provided"}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger>
                  <Button type="button" size="default">
                    <Pencil size={14} /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Education</DialogTitle>
                  </DialogHeader>
                  <CandidateEducationForm
                    type="edit"
                    education={edu}
                    userId={String(userId)}
                    educationId={String(edu._id)}
                  />
                </DialogContent>
              </Dialog>

              <ActionButton
                action={() => deleteEducationFromCandidateProfile(String(userId), String(edu._id))}
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
        <div>No Education data yet</div>
      )}
    </div>
  );
}
