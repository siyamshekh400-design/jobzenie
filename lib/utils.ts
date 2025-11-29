import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import countries from "@/constants/countries.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.round(diffMilliseconds / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  }

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  return `${diffDays} days ago`;
};

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return format(d, "dd MMM yyyy");
};

export const getCountries = () => {
  return countries.map((country) => ({
    label: country.name,
    value: country.name,
  }));
};

export const getCompanyInitials = (name?: string) => {
  if (!name) return "?";

  const words = name.trim().split(" ");
  const firstLetter = words[0]?.[0] || "";
  const secondLetter = words[1]?.[0] || "";
  return (firstLetter + secondLetter).toUpperCase();
};
