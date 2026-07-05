import type { Metadata } from "next";
import { LegalHeader } from "@/components/ui/LegalHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RadAssistPro collects, uses, and protects your information, including HIPAA and PHI handling for radiology support engagements.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: June 28, 2026. This policy explains how ${siteConfig.name} collects, uses, and protects your information.`}
      />

      <section className="section-padding-tight bg-cream-50">
        <div className="container-narrow px-5 prose-policy">
          <h2>Information We Collect</h2>
          <p>
            When you contact us through our website, book a call, or engage our
            services, we may collect your name, work email, phone number,
            organization, role, and any information you voluntarily provide
            about your radiology operations.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Respond to inquiries and schedule workflow assessments</li>
            <li>Scope PACS admin and prelim coverage for your facility</li>
            <li>Deliver contracted services and operational support</li>
            <li>Send performance reports and service-related communications</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h2>HIPAA and Protected Health Information</h2>
          <p>
            {siteConfig.name} operates under Business Associate Agreements with
            covered entities where applicable. We do not use website contact
            forms to collect protected health information (PHI). Operational PHI
            is handled only within your authorized PACS
            environments under your established protocols.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with
            service providers who assist in hosting, communications, or
            operations, subject to confidentiality and security obligations.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain contact and business information for as long as needed to
            fulfill the purposes described in this policy, unless a longer
            retention period is required by law.
          </p>

          <h2>Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards
            designed to protect information against unauthorized access,
            alteration, or disclosure.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access,
            correct, or delete personal information we hold. Contact us at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> to
            make a request.
          </p>

          <h2>Contact</h2>
          <p>
            {siteConfig.name}, {siteConfig.unit}
            <br />
            {siteConfig.address}
            <br />
            {siteConfig.phone} · {siteConfig.email}
          </p>
        </div>
      </section>
    </>
  );
}
