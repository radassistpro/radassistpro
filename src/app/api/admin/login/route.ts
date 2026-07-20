import { NextResponse } from "next/server";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";
import { setHrSession } from "@/lib/admin-auth";
import {
  guardApiRequest,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    guardApiRequest(request, {
      rateKey: "admin-login",
      limit: 10,
      windowMs: 15 * 60 * 1000,
    });

    const body = await readJsonBody<{ email?: string; password?: string }>(request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password || "";
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password required." }, { status: 422 });
    }

    const client = createClient({
      baseUrl: getInsforgeUrl(),
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    });

    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data?.accessToken || !data.user) {
      return NextResponse.json(
        { ok: false, error: error?.message || "Invalid email or password." },
        { status: 401 },
      );
    }

    const admin = createInsforgeAdmin();
    const { data: profile } = await admin.database
      .from("hr_profiles")
      .select("id, role, full_name")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (!profile) {
      return NextResponse.json(
        { ok: false, error: "This account is not authorized for HR admin." },
        { status: 403 },
      );
    }

    await setHrSession(data.accessToken);
    return NextResponse.json({
      ok: true,
      user: { email: data.user.email, name: profile.full_name, role: profile.role },
    });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Admin login failed", err);
    return NextResponse.json({ ok: false, error: "Login failed." }, { status: 500 });
  }
}
