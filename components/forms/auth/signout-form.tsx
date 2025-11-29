"use client";

import { Laptop } from "lucide-react";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

interface ILogOutProps {
  userAgent?: string | null | undefined;
}

export function LogoutForm({ userAgent }: ILogOutProps) {
  const router = useRouter();

  const parser = UAParser(userAgent as string);

  const os = parser.os;
  const browser = parser.browser;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in"); // redirect to login page
        },
      },
    });
  };
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Sessions</CardTitle>
        <CardDescription>Manage your active sessions and revoke access.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="border-border flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className="bg-background border-border rounded-full border p-2">
              <Laptop className="text-muted-foreground h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">Current Session</p>
              <p className="text-muted-foreground text-sm">{`${os?.name} ${os?.version}`}</p>
              <p className="text-muted-foreground text-sm">{`${browser?.name} ${browser?.version}`}</p>
            </div>
          </div>
          <Button onClick={() => handleLogout()} variant="outline" size="sm">
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
