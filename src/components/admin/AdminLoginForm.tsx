"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Login failed");
      router.replace("/admin/careers");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
      <label className="block">
        <span className="admin-label">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input"
          autoComplete="current-password"
        />
      </label>
      <button type="submit" className="admin-btn admin-btn-primary w-full !py-2.5" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm admin-muted">
        <a href="/admin/careers/forgot-password/" className="admin-link">
          Forgot password?
        </a>
      </p>
      {error && (
        <div className="admin-toast error !mt-0" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
