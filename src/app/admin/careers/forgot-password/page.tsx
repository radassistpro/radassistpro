import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminForgotPasswordForm } from "@/components/admin/AdminForgotPasswordForm";
import { getHrUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminForgotPasswordPage() {
  const session = await getHrUser();
  if (session) redirect("/admin/careers");

  return (
    <div className="admin-app grain">
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <p className="admin-brand-kicker">RadAssistPro · Internal</p>
          <h1 className="admin-topbar-title mt-2">Reset password</h1>
          <p className="admin-muted mt-2 text-sm leading-relaxed">
            Enter your HR email. We&apos;ll send a one-time code if an account exists.
          </p>
          <div className="mt-8">
            <AdminForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
