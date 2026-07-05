const MAX = {
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  organization: 200,
  interest: 120,
  message: 4000,
  source: 60,
} as const;

const ALLOWED_SOURCES = new Set([
  "home-contact",
  "book-a-call",
  "website",
]);

export function getAllowedOrigins(): string[] {
  const origins = new Set<string>([
    "https://radassistpro.com",
    "https://www.radassistpro.com",
    "http://localhost:3010",
    "http://127.0.0.1:3010",
  ]);

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.VERCEL_BRANCH_URL) {
    origins.add(`https://${process.env.VERCEL_BRANCH_URL}`);
  }

  return [...origins];
}

export function isAllowedOrigin(request: Request): boolean {
  const allowed = getAllowedOrigins();
  const origin = request.headers.get("origin");
  if (origin) {
    return allowed.includes(origin);
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return allowed.includes(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return false;
}

export function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function normalizeLeadPayload(data: Record<string, unknown>) {
  const firstName = trimField(data.firstName, MAX.firstName);
  const lastName = trimField(data.lastName, MAX.lastName);
  const email = trimField(data.email, MAX.email).toLowerCase();
  const phone = trimField(data.phone, MAX.phone);
  const organization = trimField(data.organization, MAX.organization);
  const interest = trimField(data.interest, MAX.interest);
  const message = trimField(data.message, MAX.message);
  const source = trimField(data.source, MAX.source) || "website";
  const honeypot = trimField(data.website, 200);

  return {
    firstName,
    lastName,
    email,
    phone,
    organization,
    interest,
    message,
    source: ALLOWED_SOURCES.has(source) ? source : "website",
    honeypot,
  };
}

export { MAX as LEAD_FIELD_LIMITS };
