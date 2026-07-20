import { cookies } from "next/headers";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";

const COOKIE = "rap_hr_access_token";

export async function setHrSession(accessToken: string) {
  const jar = await cookies();
  jar.set(COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 3,
  });
}

export async function clearHrSession() {
  const jar = await cookies();
  jar.set(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/admin",
    maxAge: 0,
  });
}

export async function getHrAccessToken() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value || null;
}

export async function getHrUser() {
  const token = await getHrAccessToken();
  if (!token) return null;

  const client = createClient({
    baseUrl: getInsforgeUrl(),
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
  });

  // Attach bearer via raw fetch to /auth/me if SDK needs setSession
  try {
    const res = await fetch(`${getInsforgeUrl()}/api/auth/sessions/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    const user = json.user || json.data?.user || json.data || json;
    if (!user?.id) return null;

    const admin = createInsforgeAdmin();
    const { data: profile } = await admin.database
      .from("hr_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!profile) return null;
    return { user, profile, accessToken: token };
  } catch {
    return null;
  }
}

export async function requireHrUser() {
  const session = await getHrUser();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
