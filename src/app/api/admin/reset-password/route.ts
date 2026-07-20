import { NextResponse } from "next/server";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";
import {
  clearPasswordResetToken,
  getPasswordResetToken,
} from "@/lib/password-reset-session";
import {
  appendPasswordHistory,
  matchesPasswordHistory,
  passwordPolicyError,
} from "@/lib/password-policy";
import {
  guardApiRequest,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

export async function POST(request: Request) {
  try {
    guardApiRequest(request, {
      rateKey: "admin-reset-password",
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });

    const resetSession = await getPasswordResetToken();
    if (!resetSession) {
      return NextResponse.json(
        { ok: false, error: "Your passcode session expired. Please verify again." },
        { status: 401 },
      );
    }

    const body = await readJsonBody<{ newPassword?: string }>(request);
    const newPassword = body.newPassword || "";

    const policyError = passwordPolicyError(newPassword);
    if (policyError) {
      return NextResponse.json({ ok: false, error: policyError }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { data: profile } = await admin.database
      .from("hr_profiles")
      .select("id, password_history")
      .eq("email", resetSession.email)
      .maybeSingle();

    if (!profile) {
      await clearPasswordResetToken();
      return NextResponse.json({ ok: false, error: "Account not found." }, { status: 400 });
    }

    const history = asStringArray(profile.password_history);
    if (matchesPasswordHistory(newPassword, history)) {
      return NextResponse.json(
        {
          ok: false,
          error: "You cannot reuse a recent password. Choose one you have not used before.",
        },
        { status: 422 },
      );
    }

    const client = createClient({
      baseUrl: getInsforgeUrl(),
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    });

    const { error: resetError } = await client.auth.resetPassword({
      newPassword,
      otp: resetSession.token,
    });

    if (resetError) {
      return NextResponse.json(
        { ok: false, error: resetError.message || "Could not reset password." },
        { status: 400 },
      );
    }

    const updatedHistory = appendPasswordHistory(history, newPassword);
    await admin.database
      .from("hr_profiles")
      .update({ password_history: updatedHistory, updated_at: new Date().toISOString() })
      .eq("id", profile.id);

    await clearPasswordResetToken();

    return NextResponse.json({ ok: true, message: "Password updated. You can sign in now." });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Reset password failed", err);
    return NextResponse.json({ ok: false, error: "Could not reset password." }, { status: 500 });
  }
}
