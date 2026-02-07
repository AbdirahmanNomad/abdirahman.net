"use client";

import Link from "next/link";
import Script from "next/script";

const BASE_URL = "https://abdirahman.net";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  /** If set, outputs BreadcrumbList JSON-LD. Defaults to BASE_URL. */
  baseUrl?: string;
  /** Current page URL path (e.g. "/blog") for schema when last item has no href. */
  currentPageUrl?: string;
  /** Visual style: dark (zinc-400/zinc-100) or light (zinc-500/zinc-900) */
  variant?: "dark" | "light";
};

export function Breadcrumb({ items, baseUrl = BASE_URL, currentPageUrl, variant = "dark" }: Props) {
  const textMuted = variant === "dark" ? "text-zinc-400" : "text-zinc-500";
  const textLink = variant === "dark" ? "hover:text-zinc-100" : "hover:text-zinc-900";
  const textCurrent = variant === "dark" ? "text-zinc-100" : "text-zinc-900";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const isLast = i === items.length - 1;
      const url = item.href ? `${baseUrl}${item.href}` : isLast && currentPageUrl ? `${baseUrl}${currentPageUrl}` : undefined;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(url && { item: url }),
      };
    }),
  };

  return (
    <>
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {i > 0 && <span className={textMuted} aria-hidden>›</span>}
              {item.href != null ? (
                <Link href={item.href} className={`${textMuted} ${textLink} underline-offset-2`} itemProp="item">
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span className={textCurrent} aria-current="page" itemProp="name">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
