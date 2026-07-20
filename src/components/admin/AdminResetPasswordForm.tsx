"use client";

import Link from "next/link";
import { useState } from "react";

export function AdminResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Reset failed");
      setMessage(json.message || "Password updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="admin-label">Work email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="admin-input"
          autoComplete="email"
        />
      </label>
      <label className="block">
        <span className="admin-label">Reset code</span>
        <input
          type="text"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="admin-input tracking-[0.3em]"
          placeholder="6-digit code"
        />
      </label>
      <label className="block">
        <span className="admin-label">New password</span>
        <input
          type="password"
          required
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="admin-input"
          autoComplete="new-password"
        />
        <p className="admin-hint">Minimum 8 characters.</p>
      </label>
      <button type="submit" className="admin-btn admin-btn-primary w-full !py-2.5" disabled={loading}>
        {loading ? "Updating…" : "Update password"}
      </button>
      {message && (
        <div className="admin-toast !mt-0">
          {message}{" "}
          <Link href="/admin/careers/login/" className="admin-link ml-1">
            Sign in
          </Link>
        </div>
      )}
      {error && (
        <div className="admin-toast error !mt-0" role="alert">
          {error}
        </div>
      )}
      <p className="text-center text-sm admin-muted">
        <Link href="/admin/careers/forgot-password/" className="admin-link">
          Request a new code
        </Link>
      </p>
    </form>
  );
}
