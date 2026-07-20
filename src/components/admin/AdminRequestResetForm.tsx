"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminRequestResetForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      router.push(`/admin/careers/verify-code/?email=${encodeURIComponent(email.trim().toLowerCase())}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
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
          placeholder="you@radassistpro.com"
          autoComplete="email"
        />
      </label>
      <button type="submit" className="admin-btn admin-btn-primary w-full !py-2.5" disabled={loading}>
        {loading ? "Sending…" : "Send reset code"}
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
