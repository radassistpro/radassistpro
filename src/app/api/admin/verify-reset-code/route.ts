import { NextResponse } from "next/server";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";
import { setPasswordResetToken } from "@/lib/password-reset-session";
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
      rateKey: "admin-verify-reset-code",
      limit: 15,
      windowMs: 60 * 60 * 1000,
    });

    const body = await readJsonBody<{ email?: string; code?: string }>(request);
    const email = body.email?.trim().toLowerCase();
    const code = body.code?.trim();

    if (!email || !code || code.length !== 6) {
      return NextResponse.json(
        { ok: false, error: "Valid email and 6-digit code are required." },
        { status: 422 },
      );
    }

    const admin = createInsforgeAdmin();
    const { data: profile } = await admin.database
      .from("hr_profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (!profile) {
      return NextResponse.json({ ok: false, error: "Invalid or expired code." }, { status: 400 });
    }

    const client = createClient({
      baseUrl: getInsforgeUrl(),
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    });

    const { data: tokenData, error: tokenError } = await client.auth.exchangeResetPasswordToken({
      email,
      code,
    });

    if (tokenError || !tokenData?.token) {
      return NextResponse.json(
        { ok: false, error: "Invalid or expired passcode." },
        { status: 400 },
      );
    }

    await setPasswordResetToken({ email, token: tokenData.token });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Verify reset code failed", err);
    return NextResponse.json({ ok: false, error: "Verification failed." }, { status: 500 });
  }
}
