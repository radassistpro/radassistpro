import { cookies } from "next/headers";

const RESET_COOKIE = "rap_pw_reset";

export async function setPasswordResetToken(payload: { email: string; token: string }) {
  const jar = await cookies();
  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
  jar.set(RESET_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  });
}

export async function getPasswordResetToken(): Promise<{ email: string; token: string } | null> {
  const jar = await cookies();
  const raw = jar.get(RESET_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as {
      email?: string;
      token?: string;
    };
    if (!parsed.email || !parsed.token) return null;
    return { email: parsed.email, token: parsed.token };
  } catch {
    return null;
  }
}

export async function clearPasswordResetToken() {
  const jar = await cookies();
  jar.set(RESET_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
