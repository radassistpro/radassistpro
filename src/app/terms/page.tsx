import type { Metadata } from "next";
import { LegalHeader } from "@/components/ui/LegalHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "RadAssistPro terms and conditions governing use of our website and our PACS administration and preliminary teleradiology services.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <LegalHeader
        eyebrow="Legal"
        title="Terms and Conditions"
        description={`Last updated: June 28, 2026. These terms govern your use of the ${siteConfig.name} website and services.`}
      />

      <section className="section-padding-tight bg-cream-50">
        <div className="container-narrow px-5 prose-policy">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing this website or engaging {siteConfig.name} services, you
            agree to these Terms and Conditions. If you do not agree, please do
            not use our website or services.
          </p>

          <h2>Services</h2>
          <p>
            {siteConfig.name} provides virtual PACS administrative support and
            preliminary teleradiology reading services to U.S. radiology
            practices. Specific scope, pricing, coverage hours, and service
            levels are defined in separate service agreements or statements of
            work executed with each client.
          </p>

          <h2>No Medical Advice</h2>
          <p>
            Information on this website is for business and operational purposes
            only. It does not constitute medical advice, diagnosis, or treatment
            recommendations. Clinical decisions remain the responsibility of
            licensed physicians at your facility.
          </p>

          <h2>Client Responsibilities</h2>
          <p>Clients are responsible for:</p>
          <ul>
            <li>Providing accurate operational and coverage requirements</li>
            <li>Provisioning authorized PACS access</li>
            <li>Maintaining executed BAAs where required</li>
            <li>Defining relay protocols, escalation rules, and QA standards</li>
          </ul>

          <h2>Pricing and Payment</h2>
          <p>
            Pricing is customized based on study volumes, modality mix, and
            coverage hours. Payment terms are specified in your service
            agreement. Unless otherwise stated, there are no long-term lock-in
            contracts.
          </p>

          <h2>Confidentiality</h2>
          <p>
            Both parties agree to protect confidential business and operational
            information. HIPAA and applicable healthcare privacy laws govern
            handling of PHI under executed BAAs.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} shall not
            be liable for indirect, incidental, or consequential damages arising
            from use of this website. Liability for contracted services is
            governed by the applicable service agreement.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All website content, branding, and materials are owned by{" "}
            {siteConfig.name} or its licensors and may not be reproduced without
            written permission.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of New Jersey,
            United States, without regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: {siteConfig.email} · {siteConfig.phone}
          </p>
        </div>
      </section>
    </>
  );
}
