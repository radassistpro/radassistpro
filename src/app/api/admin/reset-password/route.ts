import { NextResponse } from "next/server";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";
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
      rateKey: "admin-reset-password",
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });

    const body = await readJsonBody<{
      email?: string;
      code?: string;
      newPassword?: string;
    }>(request);

    const email = body.email?.trim().toLowerCase();
    const code = body.code?.trim();
    const newPassword = body.newPassword || "";

    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { ok: false, error: "Email, code, and new password are required." },
        { status: 422 },
      );
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 8 characters." },
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
      return NextResponse.json(
        { ok: false, error: "Invalid code or email." },
        { status: 400 },
      );
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
        { ok: false, error: "Invalid or expired reset code." },
        { status: 400 },
      );
    }

    const { error: resetError } = await client.auth.resetPassword({
      newPassword,
      otp: tokenData.token,
    });

    if (resetError) {
      return NextResponse.json(
        { ok: false, error: resetError.message || "Could not reset password." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, message: "Password updated. You can sign in now." });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Reset password failed", err);
    return NextResponse.json({ ok: false, error: "Could not reset password." }, { status: 500 });
  }
}
