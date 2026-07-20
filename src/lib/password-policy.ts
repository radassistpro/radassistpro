import { scryptSync, timingSafeEqual, randomBytes } from "crypto";

export const PASSWORD_RULES = {
  minLength: 12,
  maxLength: 128,
  historyCount: 5,
} as const;

export type PasswordCheck = {
  id: string;
  label: string;
  passed: boolean;
};

export type PasswordValidation = {
  valid: boolean;
  score: number;
  checks: PasswordCheck[];
};

const SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;

export function analyzePassword(password: string): PasswordValidation {
  const checks: PasswordCheck[] = [
    {
      id: "length",
      label: `At least ${PASSWORD_RULES.minLength} characters`,
      passed: password.length >= PASSWORD_RULES.minLength,
    },
    {
      id: "upper",
      label: "One uppercase letter (A–Z)",
      passed: /[A-Z]/.test(password),
    },
    {
      id: "lower",
      label: "One lowercase letter (a–z)",
      passed: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "One number (0–9)",
      passed: /[0-9]/.test(password),
    },
    {
      id: "special",
      label: "One special character (!@#$…)",
      passed: SPECIAL.test(password),
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = password.length === 0 ? 0 : Math.min(4, Math.floor((passedCount / checks.length) * 4));

  return {
    valid: checks.every((c) => c.passed) && password.length <= PASSWORD_RULES.maxLength,
    score,
    checks,
  };
}

export function passwordPolicyError(password: string): string | null {
  const result = analyzePassword(password);
  if (result.valid) return null;
  const failed = result.checks.find((c) => !c.passed);
  if (failed) return `Password requirement not met: ${failed.label}.`;
  if (password.length > PASSWORD_RULES.maxLength) return "Password is too long.";
  return "Password does not meet requirements.";
}

export function hashPasswordForHistory(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function matchesPasswordHistory(password: string, history: string[]): boolean {
  for (const entry of history) {
    const [salt, expected] = entry.split(":");
    if (!salt || !expected) continue;
    const hash = scryptSync(password, salt, 64).toString("hex");
    try {
      if (timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expected, "hex"))) {
        return true;
      }
    } catch {
      continue;
    }
  }
  return false;
}

export function appendPasswordHistory(history: string[], password: string): string[] {
  const next = [...history, hashPasswordForHistory(password)];
  return next.slice(-PASSWORD_RULES.historyCount);
}
