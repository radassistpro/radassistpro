import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminNewPasswordForm } from "@/components/admin/AdminNewPasswordForm";
import { getHrUser } from "@/lib/admin-auth";
import { getPasswordResetToken } from "@/lib/password-reset-session";

export const metadata: Metadata = {
  title: "Set New Password",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminNewPasswordPage() {
  const session = await getHrUser();
  if (session) redirect("/admin/careers");

  const resetSession = await getPasswordResetToken();
  if (!resetSession) redirect("/admin/careers/forgot-password/");

  return (
    <div className="admin-app grain">
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <p className="admin-brand-kicker">Step 3 of 3</p>
          <h1 className="admin-topbar-title mt-2">Create new password</h1>
          <p className="admin-muted mt-2 text-sm leading-relaxed">
            Passcode verified for <span className="text-white">{resetSession.email}</span>.
            Choose a strong password you haven&apos;t used before.
          </p>
          <div className="mt-8">
            <AdminNewPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
