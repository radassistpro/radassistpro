"use client";

import Image from "next/image";
import {
  Briefcase,
  FilePlus2,
  FormInput,
  Inbox,
  LogOut,
  UserPlus,
} from "lucide-react";

type NavId = "jobs" | "jobForm" | "templates" | "templateForm" | "applications" | "users";

type Props = {
  activeTab: NavId;
  jobFormLabel: string;
  onNavigate: (tab: NavId) => void;
  onLogout: () => void;
  topTitle: string;
  topMeta: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const navItems: { id: NavId; label: string; icon: typeof Briefcase }[] = [
  { id: "jobs", label: "Job postings", icon: Briefcase },
  { id: "jobForm", label: "Create / edit", icon: FilePlus2 },
  { id: "templates", label: "Apply forms", icon: FormInput },
  { id: "applications", label: "Applications", icon: Inbox },
  { id: "users", label: "Team access", icon: UserPlus },
];

export function AdminShell({
  activeTab,
  jobFormLabel,
  onNavigate,
  onLogout,
  topTitle,
  topMeta,
  action,
  children,
}: Props) {
  return (
    <div className="admin-app grain">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <Image
              src="/logo-light.png"
              alt="RadAssistPro"
              width={140}
              height={32}
              className="h-7 w-auto"
            />
            <p className="admin-brand-kicker mt-4">Internal</p>
            <h1 className="admin-brand-title">Careers admin</h1>
            <p className="admin-brand-sub">Jobs, applications & HR access</p>
          </div>

          <nav className="admin-nav" aria-label="Admin navigation">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`admin-nav-item ${
                  activeTab === id || (id === "templates" && activeTab === "templateForm")
                    ? "active"
                    : ""
                }`}
              >
                <span className="admin-nav-icon">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                {id === "jobForm"
                  ? jobFormLabel
                  : id === "templateForm"
                    ? "Edit template"
                    : label}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <button type="button" onClick={onLogout} className="admin-nav-item w-full">
              <span className="admin-nav-icon">
                <LogOut className="h-4 w-4" strokeWidth={1.75} />
              </span>
              Sign out
            </button>
          </div>
        </aside>

        <div className="admin-main">
          <div className="admin-topbar">
            <div>
              <h2 className="admin-topbar-title">{topTitle}</h2>
              <p className="admin-topbar-meta">{topMeta}</p>
            </div>
            {action}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AdminStatGrid({
  stats,
}: {
  stats: { jobs: number; published: number; applications: number; newApplications: number };
}) {
  const items = [
    ["Total roles", stats.jobs],
    ["Live postings", stats.published],
    ["Applications", stats.applications],
    ["New this week", stats.newApplications],
  ] as const;

  return (
    <div className="admin-stat-grid">
      {items.map(([label, value]) => (
        <div key={label} className="admin-stat-card">
          <p className="admin-stat-label">{label}</p>
          <p className="admin-stat-value">{value}</p>
        </div>
      ))}
    </div>
  );
}

export function AdminBadge({ value }: { value: string }) {
  const key = value.toLowerCase().replace(/\s+/g, "");
  const known = [
    "published",
    "draft",
    "archived",
    "new",
    "reviewing",
    "shortlisted",
    "rejected",
    "hired",
  ].includes(key)
    ? key
    : "";
  return <span className={`admin-badge ${known}`}>{value}</span>;
}

export function AdminLoading() {
  return <p className="admin-loading">Loading dashboard…</p>;
}
