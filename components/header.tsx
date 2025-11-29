"use client";

import { Menu, X, Briefcase, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import ProfileMenu from "./shared/profile-menu";

interface IProfileMenuProps {
  name: string | undefined;
  email: string | undefined;
  image?: string | null | undefined;
  accountType: "candidate" | "employee" | undefined;
  role: "admin" | "user" | undefined;
  isCandiateProfileCreated?: boolean | undefined;
  isEmployeeProfileCreated?: boolean | undefined;
}
export default function Header({
  name,
  email,
  role,
  image,
  accountType,
  isCandiateProfileCreated,
  isEmployeeProfileCreated,
}: IProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  // const { data } = authClient.useSession();
  // console.log("🚀 ~ Header ~ data:", data);

  // console.log(data);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/talents", label: "Talents" },
  ];

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-primary flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
        >
          <div className="from-primary to-accent text-primary-foreground rounded-lg bg-linear-to-br p-2 shadow-lg">
            <Briefcase size={20} />
          </div>
          <span className="gradient-text">jobsfiesta</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary group relative text-sm font-medium transition-colors duration-200"
            >
              {link.label}
              <span className="from-primary to-accent absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="hover:bg-secondary rounded-lg p-2 transition-all duration-200 hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-blue-600" />
            )}
          </button>

          {email ? (
            <ProfileMenu
              name={name}
              email={email}
              image={image as string}
              role={role}
              accountType={accountType}
              isCandiateProfileCreated={isCandiateProfileCreated}
              isEmployeeProfileCreated={isEmployeeProfileCreated}
            />
          ) : (
            <div className="hidden gap-2 sm:flex">
              <Button variant="outline" asChild className="hover:bg-secondary bg-transparent">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="from-primary to-accent bg-linear-to-r transition-opacity hover:opacity-90">
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-border bg-card animate-slide-down border-t md:hidden">
          <div className="space-y-3 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary block text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!email ? (
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="from-primary to-accent w-full bg-linear-to-r">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
