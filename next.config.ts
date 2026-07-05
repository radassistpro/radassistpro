import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: static export ("output: export") was removed so the Resend
  // lead-capture API route (src/app/api/lead/route.ts) can run on a server
  // runtime. Deploy to a Node/serverless host such as Vercel.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
