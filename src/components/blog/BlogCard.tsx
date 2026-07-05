import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-navy-950/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="heading-section mt-3 text-xl text-navy-950 transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
