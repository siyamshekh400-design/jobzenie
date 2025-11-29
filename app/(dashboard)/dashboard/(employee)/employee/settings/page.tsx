import DeleteAccountSection from "@/components/dashboard/delete-account-section";
import { EmailForm } from "@/components/forms/auth/email-form";
import { ProfileNameForm } from "@/components/forms/auth/name-form";
import { PasswordForm } from "@/components/forms/auth/password-form";
import { LogoutForm } from "@/components/forms/auth/signout-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

export default async function ProfileSettings() {
  const me = await getServerSession();
  const user = me?.user as User;
  return (
    <div className="bg-background text-foreground flex min-h-screen justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl space-y-6">
        {/* Avatar Section */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-card-foreground text-lg font-semibold">Avatar</CardTitle>
              <CardDescription className="text-muted-foreground">
                Click on the avatar to upload a custom one from your files.
              </CardDescription>
            </div>
            <Avatar className="h-16 w-16 shrink-0 cursor-pointer">
              <AvatarImage src={me?.user?.image as string} alt={me?.user?.name} />
              <AvatarFallback>RH</AvatarFallback>
            </Avatar>
          </CardHeader>

          <div className="px-6">
            <div className="border-border border-t" />
          </div>

          <CardFooter className="pt-4 pb-4">
            <p className="text-muted-foreground text-sm">An avatar is optional but strongly recommended.</p>
          </CardFooter>
        </Card>

        {/* Name Section */}
        <ProfileNameForm name={user?.name as string} email={user?.email as string} accountType={user?.accountType} />

        {/* Email Section */}
        <EmailForm userEmail={me?.user?.email as string} />

        {/* Pss section */}
        <PasswordForm />

        {/* Logout form */}
        <LogoutForm userAgent={me?.session?.userAgent} />

        {/* Delete Section */}

        {/* Delete Section */}
        <DeleteAccountSection accountId={me?.user?.id} />
      </div>
    </div>
  );
}
