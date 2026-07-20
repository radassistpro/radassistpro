import { NextResponse } from "next/server";
import { createClient } from "@insforge/sdk";
import { createInsforgeAdmin, getInsforgeUrl } from "@/lib/insforge";
import {
  guardApiRequest,
  getSiteUrl,
  PASSWORD_RESET_SENT,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    guardApiRequest(request, {
      rateKey: "admin-forgot-password",
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });

    const body = await readJsonBody<{ email?: string }>(request);
    const email = body.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { data: profile } = await admin.database
      .from("hr_profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (profile) {
      const client = createClient({
        baseUrl: getInsforgeUrl(),
        anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
      });

      const redirectTo = `${getSiteUrl()}/admin/careers/reset-password/`;
      const { error } = await client.auth.sendResetPasswordEmail({ email, redirectTo });
      if (error) {
        console.error("Reset email failed", error.message);
      }
    }

    return NextResponse.json({ ok: true, message: PASSWORD_RESET_SENT });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    console.error("Forgot password failed", err);
    return NextResponse.json({ ok: false, error: "Could not process request." }, { status: 500 });
  }
}
