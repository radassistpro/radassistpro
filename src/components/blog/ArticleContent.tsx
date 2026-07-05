import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { Block } from "@/lib/blog";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`${keyPrefix}-t-${i}`}>{text.slice(lastIndex, match.index)}</Fragment>,
      );
    }
    if (match[1] && match[2]) {
      const label = match[1];
      const href = match[2];
      const isInternal = href.startsWith("/");
      nodes.push(
        isInternal ? (
          <Link
            key={`${keyPrefix}-l-${i}`}
            href={href}
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {label}
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-l-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {label}
          </a>
        ),
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-navy-950">
          {match[3]}
        </strong>,
      );
    }
    lastIndex = pattern.lastIndex;
    i += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`${keyPrefix}-t-end`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

export function ArticleContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `block-${index}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                id={slugify(block.text)}
                className="heading-section scroll-mt-28 pt-4 text-2xl text-navy-950 md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="text-xl font-semibold text-navy-900">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={key} className="text-[1.05rem] leading-relaxed text-navy-800">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="space-y-2.5 pl-1">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-800">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{renderInline(item, `${key}-${i}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="space-y-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-4 text-navy-800">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">
                      {renderInline(item, `${key}-${i}`)}
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={key} className="my-2 overflow-hidden rounded-xl border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-navy-950 text-white">
                      <tr>
                        {block.headers.map((header, i) => (
                          <th key={i} className="px-4 py-3 font-semibold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className={ri % 2 === 0 ? "bg-surface" : "bg-cream-100"}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={
                                ci === 0
                                  ? "px-4 py-3 font-medium text-navy-900"
                                  : "px-4 py-3 text-navy-800"
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="border-t border-border bg-cream-100 px-4 py-2 text-xs text-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside
                key={key}
                className="rounded-xl border-l-4 border-accent bg-cream-100 p-5"
              >
                {block.title && (
                  <p className="font-semibold text-navy-950">{block.title}</p>
                )}
                <p className="mt-1 leading-relaxed text-navy-800">
                  {renderInline(block.text, key)}
                </p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
