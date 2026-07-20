import { createClient, createAdminClient } from "@insforge/sdk";

export function getInsforgeUrl() {
  return (
    process.env.INSFORGE_URL ||
    process.env.NEXT_PUBLIC_INSFORGE_URL ||
    ""
  );
}

/** True when public InsForge env is present (safe to call during build). */
export function hasInsforgePublicEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_INSFORGE_URL && process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY,
  );
}

/** Browser / public (anon) client */
export function createPublicClient() {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;
  if (!baseUrl || !anonKey) {
    throw new Error("InsForge public env vars are not configured.");
  }
  return createClient({ baseUrl, anonKey });
}

/** Server-only admin client (full access) */
export function createInsforgeAdmin() {
  const baseUrl = getInsforgeUrl();
  const apiKey = process.env.INSFORGE_API_KEY;
  if (!baseUrl || !apiKey) {
    throw new Error("InsForge admin env vars are not configured.");
  }
  return createAdminClient({ baseUrl, apiKey });
}
