import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { FaqSection, faqSchema, type Faq } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSortedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Radiology & Teleradiology Blog",
  description:
    "Guides on teleradiology, virtual PACS administration, turnaround time, and after-hours coverage for U.S. radiology groups, imaging centers, and hospitals.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: `Radiology & Teleradiology Blog | ${siteConfig.name}`,
    description:
      "Practical guides on teleradiology, PACS administration, and radiology operations for U.S. facilities.",
    url: `${siteConfig.url}/blog/`,
    type: "website",
  },
};

const faqs: Faq[] = [
  {
    q: "What does RadAssistPro do?",
    a: "RadAssistPro provides U.S.-based virtual PACS administration and preliminary teleradiology support that works inside your existing PACS. Virtual PACS admins handle critical-results relay, calls, worklist triage, and addendum coordination, while licensed teleradiologists provide preliminary reads for after-hours and overflow volume.",
  },
  {
    q: "What is teleradiology?",
    a: "Teleradiology is the electronic transmission of medical images such as CT, MRI, X-ray, and ultrasound from one location to another so a licensed radiologist can interpret them remotely. It is used for after-hours coverage, subspecialty reads, and overflow capacity.",
  },
  {
    q: "What is a virtual PACS administrator?",
    a: "A virtual PACS administrator remotely manages the operational side of a radiology worklist, including critical-results relay, inbound and outbound calls, worklist triage, and addendum coordination, inside your existing PACS. The role is non-interpretive, so PACS admins do not read studies.",
  },
  {
    q: "Does RadAssistPro serve radiology facilities across the United States?",
    a: "Yes. RadAssistPro supports U.S. radiology groups, imaging centers, urgent care, and hospital networks with a U.S.-based account team. Teleradiology reads are provided by radiologists licensed in the state where the patient is located and credentialed at the facility.",
  },
  {
    q: "Is RadAssistPro HIPAA compliant?",
    a: "RadAssistPro operates under HIPAA-aligned workflows and executes a Business Associate Agreement (BAA) before accessing any protected health information. Work is performed inside your PACS using roles your IT team controls, with critical-results relay documented for audit.",
  },
  {
    q: "How quickly can a facility get radiology coverage?",
    a: "Most facilities go live in about 10 to 15 business days from the first discovery call. The main variables are your IT team's PACS provisioning queue and legal review of the BAA. There are no setup fees and no long-term contract required.",
  },
];

export default function BlogPage() {
  const posts = getSortedPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog/#blog`,
    name: `${siteConfig.name} Radiology & Teleradiology Blog`,
    description:
      "Guides on teleradiology, virtual PACS administration, radiology turnaround time, and after-hours coverage for U.S. facilities.",
    url: `${siteConfig.url}/blog/`,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: `${siteConfig.url}/blog/${post.slug}/`,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      image: `${siteConfig.url}${post.heroImage}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog/` },
    ],
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema(faqs)} />

      <PageHero
        eyebrow="Insights"
        title="Radiology & teleradiology, explained"
        description="Practical, no-jargon guides on teleradiology, virtual PACS administration, turnaround time, and after-hours coverage for U.S. radiology groups, imaging centers, and hospitals."
        image={posts[0]?.heroImage}
        imageAlt="RadAssistPro radiology and teleradiology insights"
      />

      <section className="section-padding bg-cream-50">
        <div className="container-wide">
          <FadeIn>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              This is where the RadAssistPro clinical operations team writes about how
              U.S. radiology coverage actually works: what teleradiology and PACS
              administration are, how to cut turnaround time, what after-hours coverage
              costs, and how to choose a partner. Every guide is written for the people
              who run radiology operations, not for search engines.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.05}>
                <BlogCard post={post} priority={index < 3} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Radiology & teleradiology FAQ" />

      <CTABand
        title="Want coverage, not just content?"
        description="Book a 15-minute call and we will map your study volumes to a PACS administration and prelim coverage plan."
        primaryLabel="Book a Call"
        primaryHref="/book-a-call"
        secondaryLabel="See How It Works"
        secondaryHref="/how-it-works"
      />
    </>
  );
}
