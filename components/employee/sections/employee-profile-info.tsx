"use client";

import UploadLogoButton from "@/components/action-buttion/upload-logo-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { IEmployerProfile } from "@/database/employee.model";

type Props = {
  employee?: IEmployerProfile;
};

export default function EmployeeProfileInfo({ employee }: Props) {
  const initials = employee?.companyName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Avatar + Upload Button */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-28 w-28 rounded-lg">
              {employee?.companyLogo?.url ? (
                <AvatarImage src={employee?.companyLogo.url} alt={employee?.companyName} />
              ) : (
                <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
              )}
            </Avatar>

            <UploadLogoButton accountType={employee?.accountType} loggedInUserId={String(employee?.user)} />
          </div>

          {/* Company Info */}
          <div className="grow space-y-2">
            <h2 className="text-3xl font-bold">{employee?.companyName}</h2>

            <p className="text-muted-foreground">{employee?.email}</p>

            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <span>👥 {employee?.companySize}</span>
              <span>🌍 {employee?.country}</span>
              <span>🏭 {employee?.industry}</span>
            </div>

            {employee?.about && <p className="mt-3 text-sm leading-relaxed">{employee?.about}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
