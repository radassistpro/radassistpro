import { NextResponse } from "next/server";
import { clearHrSession } from "@/lib/admin-auth";
import { assertTrustedOrigin, securityErrorResponse } from "@/lib/api-security";

export async function POST(request: Request) {
  try {
    assertTrustedOrigin(request);
    await clearHrSession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    return NextResponse.json({ ok: false, error: "Logout failed." }, { status: 500 });
  }
}
