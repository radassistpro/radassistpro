import { NextResponse } from "next/server";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";
import { requireHrUser } from "@/lib/admin-auth";
import {
  assertTrustedOrigin,
  guardApiRequest,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    assertTrustedOrigin(request);
    guardApiRequest(request, {
      rateKey: "admin-create-user",
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });

    const session = await requireHrUser();
    if (session.profile.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Only admins can create users." }, { status: 403 });
    }

    const body = await readJsonBody<{
      email?: string;
      password?: string;
      fullName?: string;
      role?: "admin" | "hr";
    }>(request);

    const email = body.email?.trim().toLowerCase();
    const password = body.password || "";
    const fullName = body.fullName?.trim() || "";
    const role = body.role === "admin" ? "admin" : "hr";

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Email and password (min 8 chars) are required." },
        { status: 422 },
      );
    }

    const client = createClient({
      baseUrl: getInsforgeUrl(),
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    });

    const { data, error } = await client.auth.signUp({
      email,
      password,
      name: fullName || email,
    });

    if (error || !data?.user?.id) {
      return NextResponse.json(
        { ok: false, error: error?.message || "Could not create user." },
        { status: 400 },
      );
    }

    const admin = createInsforgeAdmin();
    const { error: profileError } = await admin.database.from("hr_profiles").insert([
      {
        user_id: data.user.id,
        email,
        full_name: fullName || email,
        role,
      },
    ]);

    if (profileError) {
      return NextResponse.json(
        { ok: false, error: profileError.message || "User created but HR profile failed." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      userId: data.user.id,
      requireEmailVerification: Boolean(data.requireEmailVerification),
    });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
