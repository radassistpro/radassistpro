"use client";

import { analyzePassword } from "@/lib/password-policy";

type Props = {
  password: string;
};

const SCORE_LABEL = ["Too weak", "Weak", "Fair", "Good", "Strong"];

export function PasswordStrengthMeter({ password }: Props) {
  const { score, checks, valid } = analyzePassword(password);

  if (!password) {
    return (
      <p className="admin-hint">
        Use 12+ characters with upper & lower case, a number, and a special character.
      </p>
    );
  }

  return (
    <div className="mt-2 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors"
              style={{
                background:
                  score > i
                    ? valid
                      ? "oklch(0.65 0.14 155)"
                      : "oklch(0.62 0.16 250)"
                    : "oklch(1 0 0 / 0.12)",
              }}
            />
          ))}
        </div>
        <span className="text-xs font-medium admin-muted">{SCORE_LABEL[score]}</span>
      </div>
      <ul className="space-y-1">
        {checks.map((check) => (
          <li
            key={check.id}
            className={`text-xs ${check.passed ? "text-emerald-400/90" : "admin-muted"}`}
          >
            {check.passed ? "✓" : "○"} {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
