import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminResetPasswordForm } from "@/components/admin/AdminResetPasswordForm";
import { getHrUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Set New Password",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminResetPasswordPage() {
  const session = await getHrUser();
  if (session) redirect("/admin/careers");

  return (
    <div className="admin-app grain">
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <p className="admin-brand-kicker">RadAssistPro · Internal</p>
          <h1 className="admin-topbar-title mt-2">Set new password</h1>
          <p className="admin-muted mt-2 text-sm leading-relaxed">
            Enter the code from your email and choose a new password.
          </p>
          <div className="mt-8">
            <AdminResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
