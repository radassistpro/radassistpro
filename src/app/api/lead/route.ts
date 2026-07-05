import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.LEAD_TO_EMAIL || siteConfig.email;
const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || "RadAssistPro Leads <onboarding@resend.dev>";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  interest?: string;
  message?: string;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#1e2a4a;border-bottom:1px solid #e5e9f0;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 12px;color:#334155;border-bottom:1px solid #e5e9f0;">${esc(value).replace(/\n/g, "<br/>")}</td>
  </tr>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Lead capture failed: RESEND_API_KEY is not set.");
    return NextResponse.json(
      {
        ok: false,
        error: "We could not send your message right now. Please call or email us directly.",
      },
      { status: 500 },
    );
  }

  let data: LeadPayload;
  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const firstName = (data.firstName || "").trim();
  const lastName = (data.lastName || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const organization = (data.organization || "").trim();
  const interest = (data.interest || "").trim();
  const message = (data.message || "").trim();
  const source = (data.source || "website").trim();

  if (!firstName || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const subject = `New inquiry: ${fullName}${organization ? ` — ${organization}` : ""}`;

  const html = `<!doctype html><html><body style="margin:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <div style="background:#0f172a;border-radius:12px 12px 0 0;padding:20px 24px;">
        <p style="margin:0;color:#93c5fd;font-size:12px;letter-spacing:2px;text-transform:uppercase;">New Lead</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">${esc(siteConfig.name)} website inquiry</h1>
      </div>
      <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:8px 12px 20px;border:1px solid #e5e9f0;border-top:none;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Name", fullName)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Organization", organization)}
          ${row("Looking for", interest)}
          ${row("Message", message)}
          ${row("Source", source)}
        </table>
        <p style="margin:16px 12px 0;color:#64748b;font-size:12px;">Reply directly to this email to reach ${esc(fullName)}.</p>
      </div>
    </div>
  </body></html>`;

  const text = [
    `New ${siteConfig.name} inquiry`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    organization && `Organization: ${organization}`,
    interest && `Looking for: ${interest}`,
    message && `Message: ${message}`,
    `Source: ${source}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "We could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error while sending your message." },
      { status: 500 },
    );
  }
}
