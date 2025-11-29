"use client";

import { Briefcase, Users, Shield, Zap } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function Services() {
  const services = [
    {
      icon: Briefcase,
      title: "Find Your Dream Job",
      description: "Browse thousands of job listings and find the perfect opportunity that matches your skills.",
      delay: "delay-0",
    },
    {
      icon: Users,
      title: "Connect with Talent",
      description: "Post jobs and connect with qualified candidates ready to join your team.",
      delay: "delay-100",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Your data is protected with industry-leading security and privacy measures.",
      delay: "delay-200",
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "Get started in minutes. Simple process from application to hiring.",
      delay: "delay-300",
    },
  ];

  return (
    <section className="to-muted/30 bg-linear-to-b from-transparent py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in mb-12 space-y-4 text-center">
          <h2 className="from-primary to-accent bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Why Choose Jobsfiesta?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            We make it easy to connect talent with opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group animate-fade-in cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border-border hover:border-primary/50 from-background to-card/50 h-full border bg-linear-to-br p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="from-primary/20 to-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br transition-transform duration-300 group-hover:scale-110">
                    <Icon className="text-primary group-hover:text-accent transition-colors" size={24} />
                  </div>
                  <h3 className="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                    {service.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
