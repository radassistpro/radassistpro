import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getHrUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "HR Admin Login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getHrUser();
  if (session) redirect("/admin/careers");

  return (
    <div className="admin-app grain">
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <p className="admin-brand-kicker">RadAssistPro · Internal</p>
          <h1 className="admin-topbar-title mt-2">Careers admin</h1>
          <p className="admin-muted mt-2 text-sm leading-relaxed">
            Sign in with your HR account to manage job postings and applications.
          </p>
          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
