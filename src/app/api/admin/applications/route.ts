import { NextResponse } from "next/server";
import { createInsforgeAdmin } from "@/lib/insforge";
import { requireHrUser } from "@/lib/admin-auth";
import {
  assertTrustedOrigin,
  readJsonBody,
  securityErrorResponse,
} from "@/lib/api-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  try {
    assertTrustedOrigin(request);
    await requireHrUser();
    const body = await readJsonBody<{ id?: string; status?: string }>(request);
    if (!body.id || !body.status) {
      return NextResponse.json({ ok: false, error: "id and status required" }, { status: 422 });
    }
    const allowed = ["new", "reviewing", "shortlisted", "rejected", "hired"];
    if (!allowed.includes(body.status)) {
      return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
    }

    const admin = createInsforgeAdmin();
    const { error } = await admin.database
      .from("applications")
      .update({ status: body.status, updated_at: new Date().toISOString() })
      .eq("id", body.id);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const sec = securityErrorResponse(err);
    if (sec) return sec;
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
