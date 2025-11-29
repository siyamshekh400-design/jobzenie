"use client";

import { Briefcase, Search, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated gradient background */}
      <div className="from-primary/20 to-accent/20 absolute inset-0 animate-pulse bg-linear-to-br via-transparent" />

      {/* Animated blurred circles */}
      <div className="bg-primary/30 animate-blob absolute top-0 -left-40 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />
      <div className="bg-accent/30 animate-blob animation-delay-2000 absolute top-0 -right-40 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />
      <div className="bg-primary/20 animate-blob animation-delay-4000 absolute -bottom-40 left-1/2 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <div className="animate-fade-in space-y-4">
            <div className="inline-block">
              <span className="bg-primary/10 border-primary/20 text-primary rounded-full border px-4 py-2 text-sm font-semibold">
                Welcome to Jobsfiesta Platform
              </span>
            </div>
            <h1 className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-5xl leading-tight font-bold text-balance text-transparent md:text-7xl">
              Find Your <span className="text-primary">Dream Job</span> Today
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed text-balance md:text-xl">
              Connect with top companies and unlock your career potential. Jobsfiesta makes job hunting simple and
              effective.
            </p>
          </div>

          {/* Search Bar with hover effect */}
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 sm:w-auto"
            >
              <Link href="/jobs" className="flex items-center gap-2">
                <Briefcase size={20} />
                Apply Job
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 sm:w-auto"
            >
              <Link href="/talents" className="flex items-center gap-2">
                <Users size={20} />
                Hire Talents
              </Link>
            </Button>
          </div>

          {/* Stats with animated counters */}
          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
            {[
              { number: "5000+", label: "Active Jobs" },
              { number: "2000+", label: "Companies" },
              { number: "50000+", label: "Candidates" },
            ].map((stat, idx) => (
              <div key={idx} className="group cursor-pointer space-y-2">
                <div className="text-primary text-4xl font-bold transition-transform duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
