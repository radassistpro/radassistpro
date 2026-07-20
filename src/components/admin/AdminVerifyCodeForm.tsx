"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  email: string;
};

export function AdminVerifyCodeForm({ email }: Props) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResendMsg("");
    try {
      const res = await fetch("/api/admin/verify-reset-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Invalid code");
      router.push("/admin/careers/new-password/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setLoading(true);
    setError("");
    setResendMsg("");
    try {
      const res = await fetch("/api/admin/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not resend");
      setResendMsg("A new code has been sent.");
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm admin-muted">
        Code sent to <span className="font-medium text-white">{email}</span>
      </p>

      <label className="block">
        <span className="admin-label">6-digit passcode</span>
        <input
          type="text"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="admin-input text-center text-xl tracking-[0.5em]"
          placeholder="000000"
          maxLength={6}
        />
      </label>

      <button
        type="submit"
        className="admin-btn admin-btn-primary w-full !py-2.5"
        disabled={loading || code.length !== 6}
      >
        {loading ? "Verifying…" : "Verify passcode"}
      </button>

      <button
        type="button"
        className="admin-btn admin-btn-ghost w-full !py-2.5"
        disabled={loading}
        onClick={() => void resend()}
      >
        Resend code
      </button>

      {resendMsg && <div className="admin-toast !mt-0">{resendMsg}</div>}
      {error && (
        <div className="admin-toast error !mt-0" role="alert">
          {error}
        </div>
      )}

      <p className="text-center text-sm admin-muted">
        <Link href="/admin/careers/forgot-password/" className="admin-link">
          Use a different email
        </Link>
        {" · "}
        <Link href="/admin/careers/login/" className="admin-link">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
