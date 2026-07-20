"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Briefcase, Building2 } from "lucide-react";
import {
  departments,
  locations,
  jobTypes,
  type Job,
} from "@/lib/careers";
import { FadeIn } from "@/components/ui/FadeIn";

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-navy-700/80">
      {children}
    </span>
  );
}

function JobRow({ job, index }: { job: Job; index: number }) {
  return (
    <FadeIn delay={index * 0.06}>
      <Link
        href={`/careers/${job.slug}`}
        className="group grid gap-6 border-b border-border py-8 transition-colors hover:bg-cream-100/60 sm:grid-cols-[1fr_auto] sm:items-end sm:px-2 lg:py-10"
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {job.featured && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Featured
              </span>
            )}
            <MetaChip>
              <Building2 className="h-3.5 w-3.5 text-accent" />
              {job.department}
            </MetaChip>
          </div>
          <h2 className="heading-display mt-3 text-2xl text-navy-950 transition-colors group-hover:text-accent md:text-3xl lg:text-4xl">
            {job.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {job.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <MetaChip>
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {job.location}
            </MetaChip>
            <MetaChip>
              <Briefcase className="h-3.5 w-3.5 text-accent" />
              {job.type}
            </MetaChip>
            <MetaChip>{job.pay}</MetaChip>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-navy-950">
          View role
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </FadeIn>
  );
}

export function CareersJobBoard({ jobs }: { jobs: Job[] }) {
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (department !== "All" && job.department !== department) return false;
      if (location !== "All" && job.location !== location) return false;
      if (type !== "All" && job.type !== type) return false;
      return true;
    });
  }, [jobs, department, location, type]);

  return (
    <div>
      <div className="grid gap-4 border-b border-border pb-8 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Department
          </span>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option>All</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Location
          </span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option>All</option>
            {locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Type
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy-950 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option>All</option>
            {jobTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-2">
        <p className="pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {filtered.length} open role{filtered.length === 1 ? "" : "s"}
        </p>
        {filtered.length === 0 ? (
          <p className="py-16 text-lg text-muted">
            No roles match these filters. Clear filters or check back soon.
          </p>
        ) : (
          <div className="mt-2">
            {filtered.map((job, i) => (
              <JobRow key={job.id} job={job} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
