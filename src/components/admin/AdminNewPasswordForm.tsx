"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordStrengthMeter } from "@/components/admin/PasswordStrengthMeter";
import { analyzePassword } from "@/lib/password-policy";

export function AdminNewPasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const analysis = analyzePassword(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!analysis.valid) {
      setError("Password does not meet all requirements.");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Reset failed");
      router.push("/admin/careers/login/?reset=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="admin-label">New password</span>
        <input
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="admin-input"
          autoComplete="new-password"
        />
        <PasswordStrengthMeter password={newPassword} />
      </label>

      <label className="block">
        <span className="admin-label">Confirm new password</span>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="admin-input"
          autoComplete="new-password"
        />
        {confirmPassword && !passwordsMatch && (
          <p className="admin-hint text-red-400/90">Passwords do not match.</p>
        )}
      </label>

      <button
        type="submit"
        className="admin-btn admin-btn-primary w-full !py-2.5"
        disabled={loading || !analysis.valid || !passwordsMatch}
      >
        {loading ? "Saving…" : "Update password"}
      </button>

      {error && (
        <div className="admin-toast error !mt-0" role="alert">
          {error}
        </div>
      )}

      <p className="text-center text-sm admin-muted">
        <Link href="/admin/careers/login/" className="admin-link">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
