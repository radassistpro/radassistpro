import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://app.cal.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cal.com https://app.cal.com",
      "font-src 'self' https://cal.com https://app.cal.com",
      "connect-src 'self' https://cal.com https://app.cal.com https://api.cal.com",
      "frame-src 'self' https://cal.com https://app.cal.com https://business.radassistpro.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const portalHost = {
  type: "host" as const,
  value: "portal.radassistpro.com",
};

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Do not apply marketing-site CSP to the employee portal proxy.
        source: "/(.*)",
        missing: [portalHost],
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    // beforeFiles so this runs before Next.js serves the marketing homepage.
    return {
      beforeFiles: [
        {
          source: "/",
          has: [portalHost],
          destination: "https://crew-hub.v-gupta-workspace.workers.dev/",
        },
        {
          source: "/:path*",
          has: [portalHost],
          destination: "https://crew-hub.v-gupta-workspace.workers.dev/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
