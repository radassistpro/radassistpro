"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ExternalLink,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminJobForm } from "@/components/admin/AdminJobForm";
import {
  AdminBadge,
  AdminLoading,
  AdminShell,
  AdminStatGrid,
} from "@/components/admin/AdminShell";

type JobRow = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  status: string;
  applicationCount: number;
  pay: string;
  featured: boolean;
  summary: string;
  about: string;
  responsibilities: string[] | null;
  requirements: string[] | null;
  looking_for: string[] | null;
  must_know_software: string[] | null;
  important_note: string | null;
  application_includes: string[] | null;
  benefits: string[] | null;
  posted_at: string | null;
};

type ApplicationRow = {
  id: string;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  portfolio_url: string;
  resume_url: string | null;
  resume_file_name: string | null;
  created_at: string;
  job_id: string;
  jobs?: { title: string; slug: string } | null;
  expected_comp: string;
  years_experience: string;
};

type Stats = {
  jobs: number;
  published: number;
  applications: number;
  newApplications: number;
};

type Tab = "jobs" | "jobForm" | "applications" | "users";

export function AdminCareersDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("jobs");
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [editingJob, setEditingJob] = useState<JobRow | null>(null);
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [actionError, setActionError] = useState(false);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "hr",
  });
  const [userMsg, setUserMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/careers/");
      const json = await res.json();
      if (res.status === 401) {
        router.replace("/admin/careers/login");
        return;
      }
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load");
      setJobs(json.jobs);
      setApplications(json.applications);
      setStats(json.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreateJob() {
    setEditingJob(null);
    setTab("jobForm");
    setActionMsg("");
    setActionError(false);
  }

  function openEditJob(job: JobRow) {
    setEditingJob(job);
    setTab("jobForm");
    setActionMsg("");
    setActionError(false);
  }

  function handleJobSaved() {
    setEditingJob(null);
    setTab("jobs");
    setActionMsg("Job saved successfully.");
    setActionError(false);
    void load();
  }

  async function logout() {
    await fetch("/api/admin/logout/", { method: "POST" });
    router.replace("/admin/careers/login");
  }

  async function updateApplicationStatus(id: string, status: string) {
    const res = await fetch("/api/admin/applications/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) void load();
  }

  async function updateJobStatus(job: JobRow, status: string) {
    setActionMsg("");
    setActionError(false);
    const res = await fetch("/api/admin/careers/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: job.id,
        title: job.title,
        slug: job.slug,
        department: job.department,
        location: job.location,
        employment_type: job.employment_type,
        status,
        featured: job.featured,
        summary: job.summary,
        about: job.about,
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        looking_for: job.looking_for || [],
        must_know_software: job.must_know_software || [],
        important_note: job.important_note,
        application_includes: job.application_includes || [],
        pay: job.pay,
        benefits: job.benefits || [],
        posted_at: job.posted_at,
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      setActionMsg(json.error || "Could not update status");
      setActionError(true);
      return;
    }
    setActionMsg(`Job marked as ${status}.`);
    void load();
  }

  async function deleteJob(job: JobRow) {
    if (!confirm(`Delete "${job.title}"? This also removes all applications for this role.`)) {
      return;
    }
    setActionMsg("");
    setActionError(false);
    const res = await fetch("/api/admin/careers/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: job.id }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      setActionMsg(json.error || "Could not delete job");
      setActionError(true);
      return;
    }
    setActionMsg("Job deleted.");
    void load();
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setUserMsg("");
    const res = await fetch("/api/admin/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForm),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      setUserMsg(json.error || "Could not create user");
      return;
    }
    setUserMsg(
      json.requireEmailVerification
        ? "User created. They must verify email before signing in."
        : "User created successfully.",
    );
    setUserForm({ email: "", password: "", fullName: "", role: "hr" });
  }

  const jobFormLabel = editingJob ? "Edit role" : "New role";

  const tabCopy: Record<Tab, { title: string; meta: string }> = {
    jobs: {
      title: "Job postings",
      meta: "Manage published roles, drafts, and archived listings.",
    },
    jobForm: {
      title: editingJob ? "Edit job" : "New job",
      meta: "Fields match what candidates see on the careers page.",
    },
    applications: {
      title: "Applications",
      meta: "Review submissions, resumes, and update hiring status.",
    },
    users: {
      title: "Team access",
      meta: "Create HR accounts for this admin panel.",
    },
  };
  const copy = tabCopy[tab];

  return (
    <AdminShell
      activeTab={tab}
      jobFormLabel={jobFormLabel}
      onNavigate={(id) => {
        if (id === "jobForm" && !editingJob) setEditingJob(null);
        setTab(id);
      }}
      onLogout={() => void logout()}
      topTitle={copy.title}
      topMeta={copy.meta}
      action={
        tab === "jobs" ? (
          <button type="button" className="admin-btn admin-btn-primary" onClick={openCreateJob}>
            <Plus className="h-4 w-4" />
            Create job
          </button>
        ) : undefined
      }
    >
      {stats && tab !== "jobForm" && <AdminStatGrid stats={stats} />}

      {actionMsg && (
        <div className={`admin-toast ${actionError ? "error" : ""}`}>{actionMsg}</div>
      )}

      {loading && <AdminLoading />}
      {error && <div className="admin-toast error">{error}</div>}

      {!loading && tab === "jobs" && (
        <div className="admin-panel">
          <div className="admin-panel-header">
            <p className="admin-panel-title">Active listings</p>
            <span className="admin-chip">{jobs.length} total</span>
          </div>
          <div className="admin-panel-body">
            {jobs.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm admin-muted">No roles published yet.</p>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary admin-btn-sm mt-4"
                  onClick={openCreateJob}
                >
                  Create your first job
                </button>
              </div>
            ) : (
              jobs.map((job) => (
                <article key={job.id} className="admin-job-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{job.title}</h3>
                      {job.featured && <span className="admin-chip">Featured</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="admin-chip">
                        <Building2 className="h-3 w-3" />
                        {job.department}
                      </span>
                      <span className="admin-chip">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                    </div>
                    {job.status === "published" && (
                      <a
                        href={`/careers/${job.slug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-link inline-flex items-center gap-1"
                      >
                        View live page
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  <div>
                    <AdminBadge value={job.status} />
                    <p className="mt-2 text-xs admin-muted">{job.pay}</p>
                  </div>

                  <div className="text-center">
                    <p className="admin-stat-label">Apps</p>
                    <p className="mt-1 text-2xl font-bold text-white">{job.applicationCount}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm"
                      onClick={() => openEditJob(job)}
                    >
                      Edit
                    </button>
                    {job.status !== "published" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm admin-btn-primary"
                        onClick={() => void updateJobStatus(job, "published")}
                      >
                        Publish
                      </button>
                    )}
                    {job.status === "published" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm"
                        onClick={() => void updateJobStatus(job, "draft")}
                      >
                        Unpublish
                      </button>
                    )}
                    {job.status !== "archived" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-sm admin-btn-ghost"
                        onClick={() => void updateJobStatus(job, "archived")}
                      >
                        Archive
                      </button>
                    )}
                    <button
                      type="button"
                      className="admin-btn admin-btn-sm admin-btn-danger"
                      onClick={() => void deleteJob(job)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}

      {!loading && tab === "jobForm" && (
        <AdminJobForm
          job={editingJob}
          onSaved={handleJobSaved}
          onCancel={() => {
            setEditingJob(null);
            setTab("jobs");
          }}
        />
      )}

      {!loading && tab === "applications" && (
        <div className="admin-panel">
          <div className="admin-panel-header">
            <p className="admin-panel-title">Inbound applications</p>
            <span className="admin-chip">{applications.length} candidates</span>
          </div>
          <div className="admin-panel-body space-y-4">
            {applications.length === 0 && (
              <p className="py-8 text-center text-sm admin-muted">
                No applications yet — they will appear here when candidates apply on the site.
              </p>
            )}
            {applications.map((app) => {
              const initials = `${app.first_name[0] || ""}${app.last_name[0] || ""}`.toUpperCase();
              return (
                <article key={app.id} className="admin-app-card">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="admin-avatar">{initials}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {app.first_name} {app.last_name}
                        </h3>
                        <p className="mt-1 text-sm admin-muted">
                          {app.jobs?.title || "Role"} · {app.email}
                        </p>
                        <p className="mt-1 text-xs admin-muted">
                          {app.phone} · {app.city} · {app.years_experience} yrs · Expected{" "}
                          {app.expected_comp}
                        </p>
                      </div>
                    </div>
                    <AdminBadge value={app.status} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    {app.portfolio_url && (
                      <a
                        href={app.portfolio_url}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-link"
                      >
                        Portfolio
                      </a>
                    )}
                    {app.resume_url && (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-link"
                      >
                        Resume{app.resume_file_name ? ` (${app.resume_file_name})` : ""}
                      </a>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["new", "reviewing", "shortlisted", "rejected", "hired"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => void updateApplicationStatus(app.id, status)}
                        className={`admin-btn admin-btn-sm capitalize ${
                          app.status === status ? "admin-btn-primary" : ""
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {!loading && tab === "users" && (
        <div className="admin-panel max-w-xl">
          <div className="admin-panel-header">
            <p className="admin-panel-title">Provision HR user</p>
          </div>
          <form onSubmit={createUser} className="admin-panel-body space-y-4">
            <p className="text-sm admin-muted">
              Create an HR account. They sign in at /admin/careers/login.
            </p>
            <label>
              <span className="admin-label">Full name</span>
              <input
                required
                value={userForm.fullName}
                onChange={(e) => setUserForm((s) => ({ ...s, fullName: e.target.value }))}
                className="admin-input"
              />
            </label>
            <label>
              <span className="admin-label">Work email</span>
              <input
                required
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm((s) => ({ ...s, email: e.target.value }))}
                className="admin-input"
              />
            </label>
            <label>
              <span className="admin-label">Temporary password</span>
              <input
                required
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm((s) => ({ ...s, password: e.target.value }))}
                className="admin-input"
              />
            </label>
            <label>
              <span className="admin-label">Role</span>
              <select
                value={userForm.role}
                onChange={(e) => setUserForm((s) => ({ ...s, role: e.target.value }))}
                className="admin-select"
              >
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button type="submit" className="admin-btn admin-btn-primary">
              Create user
            </button>
            {userMsg && <p className="text-sm admin-muted">{userMsg}</p>}
          </form>
        </div>
      )}
    </AdminShell>
  );
}
