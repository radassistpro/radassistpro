import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, RefreshCw } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTABand } from "@/components/ui/CTABand";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { FaqSection, faqSchema } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPostSlugs, getPost, getRelatedPosts } from "@/lib/blog";
import { author, siteConfig } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}/`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [{ url: `${siteConfig.url}${post.heroImage}`, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const url = `${siteConfig.url}/blog/${post.slug}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.metaDescription,
    image: `${siteConfig.url}${post.heroImage}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "en-US",
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: author.name,
      description: author.bio,
      url: `${siteConfig.url}/about/`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema(post.faqs)} />

      <article>
        <header className="relative overflow-hidden bg-navy-950 pt-32 pb-16 grain lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 opacity-25">
            <Image
              src={post.heroImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="video-overlay absolute inset-0" />
          <div className="container-narrow relative px-5">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              {post.category}
            </p>
            <h1 className="heading-display mt-5 text-balance text-[clamp(2rem,4.5vw,3.25rem)] text-white">
              {post.title}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="font-medium text-white">By {author.name}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-blue-400" />
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-blue-400" />
                Updated {formatDate(post.dateModified)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-400" />
                {post.readingTime}
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream-50 to-transparent" />
        </header>

        <div className="section-padding bg-cream-50">
          <div className="container-narrow px-5">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-navy-950/5 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Key takeaways
                </p>
                <ul className="mt-4 space-y-3">
                  {post.takeaways.map((item, i) => (
                    <li key={i} className="flex gap-3 text-navy-800">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <div className="mt-12">
              <ArticleContent blocks={post.blocks} />
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-surface p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                About the author
              </p>
              <p className="mt-3 font-semibold text-navy-950">{author.name}</p>
              <p className="text-sm text-muted">{author.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      <FaqSection faqs={post.faqs} title="Frequently asked questions" />

      {related.length > 0 && (
        <section className="section-padding bg-cream-50">
          <div className="container-wide">
            <h2 className="heading-section text-3xl text-navy-950">Keep reading</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
