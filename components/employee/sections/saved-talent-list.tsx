import { EyeIcon, Folder } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import RemoveFavouriteButton from "@/components/action-buttion/remove-fovourite-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { getSavedCandidates } from "@/lib/actions/employee.action";

interface IProps {
  employeeId: string;
}

const SavedTalentsLists = async ({ employeeId }: IProps) => {
  const { data, error } = await getSavedCandidates(employeeId);
  if (error) {
    toast.error(error.message);
  }

  const candidates = data?.candidates || [];

  return (
    <>
      {candidates.length > 0 ? (
        candidates?.map((candidate) => (
          <Card key={String(candidate._id)} className="mt-4 p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold">{candidate.name}</h3>
                <p className="text-muted-foreground mb-3">{candidate?.headline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {candidate?.skills.slice(0, 3).map((skill) => {
                    return <Badge key={skill}>{skill}</Badge>;
                  })}
                  {candidate?.skills.slice(3).length > 0 && <Badge>{candidate?.skills.slice(3).length} +more</Badge>}
                </div>
                {/* <div className="flex flex-wrap gap-4 text-sm">
                <div className="text-muted-foreground">⭐ {candidate.rating}</div>
                <div className="text-muted-foreground">{candidate.experience}</div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    candidate.status === "shortlisted"
                      ? "bg-green-100 text-green-800"
                      : candidate.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {candidate.status}
                </span>
              </div> */}
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/talents/${candidate._id}`}>
                  <Button>
                    <EyeIcon size={16} /> <span className="hidden">View</span>
                  </Button>
                </Link>
                <RemoveFavouriteButton candidateId={String(candidate._id)} employeeId={employeeId} />
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Folder size={16} />
              </EmptyMedia>
              <EmptyTitle>No data</EmptyTitle>
              <EmptyDescription>No data found</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </>
  );
};
export default SavedTalentsLists;
