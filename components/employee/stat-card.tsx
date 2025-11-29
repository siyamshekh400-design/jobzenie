import { DynamicIcon } from "lucide-react/dynamic";
import type { IconName } from "lucide-react/dynamic";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | undefined;
  iconName: IconName;
  description?: string;
}

export function StatCard({ title, value, iconName, description }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
          </div>
          <div className="text-2xl opacity-20">
            <DynamicIcon className="size-4" name={iconName} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
