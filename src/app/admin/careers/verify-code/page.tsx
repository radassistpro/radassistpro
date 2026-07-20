import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminVerifyCodeForm } from "@/components/admin/AdminVerifyCodeForm";
import { getHrUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Verify Passcode",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ email?: string }>;
};

export default async function AdminVerifyCodePage({ searchParams }: Props) {
  const session = await getHrUser();
  if (session) redirect("/admin/careers");

  const { email: rawEmail } = await searchParams;
  const email = rawEmail?.trim().toLowerCase();
  if (!email) redirect("/admin/careers/forgot-password/");

  return (
    <div className="admin-app grain">
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <p className="admin-brand-kicker">Step 2 of 3</p>
          <h1 className="admin-topbar-title mt-2">Verify passcode</h1>
          <p className="admin-muted mt-2 text-sm leading-relaxed">
            Enter the 6-digit code from your email to continue.
          </p>
          <div className="mt-8">
            <AdminVerifyCodeForm email={email} />
          </div>
        </div>
      </div>
    </div>
  );
}
