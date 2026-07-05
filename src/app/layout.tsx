import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Virtual PACS Admins & Prelim Teleradiology`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "U.S.-based virtual PACS administrators and licensed preliminary teleradiology readers working inside your existing PACS. Book a 15-minute workflow call.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} | Virtual PACS Admins & Prelim Teleradiology`,
    description:
      "PACS administration and preliminary reads inside your existing PACS. No new software. 24/7 coverage.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RadAssistPro — Virtual PACS Admins and Prelim Teleradiology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Virtual PACS Admins & Prelim Teleradiology`,
    description:
      "PACS administration and preliminary reads inside your existing PACS.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1625 Jacks Way",
    addressLocality: "Toms River",
    addressRegion: "NJ",
    postalCode: "08755",
    addressCountry: "US",
  },
  parentOrganization: { "@type": "Organization", name: "RxOnWeb" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema} />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
