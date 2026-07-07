/** Cal.com booking — business@radassistpro.com */
export const calcomConfig = {
  namespace: "15mins",
  calLink:
    process.env.NEXT_PUBLIC_CALCOM_LINK ??
    "business-radassistpro-jhpni1/15mins",
  calOrigin: process.env.NEXT_PUBLIC_CALCOM_ORIGIN ?? "https://app.cal.com",
  durationMinutes: 15,
  /** Site accent (--blue-600) for Cal.com embed branding */
  brandColor: "#3564d4",
  textEmphasis: "#1e2a4a",
} as const;

export function getCalBookingUrl(): string {
  const origin = calcomConfig.calOrigin.replace(/\/$/, "");
  const link = calcomConfig.calLink.replace(/^\//, "");
  return `${origin}/${link}`;
}
