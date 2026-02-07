import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getProject, getProjects } from "@/lib/content";
import { Mdx } from "@/app/components/mdx";
import { Breadcrumb } from "@/app/components/breadcrumb";
import { Header } from "./header";
import { SocialShareButtons } from "@/app/components/social-share-buttons";
import "./mdx.css";
import { ReportView } from "./view";
import { getRedisClient } from "@/util/redis";
import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

const baseUrl = "https://abdirahman.net";

type Props = {
  params: Promise<{ slug: string }>;
};

const redis = getRedisClient();

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} | Abdirahman Ahmed`;
  const projectUrl = `${baseUrl}/projects/${project.slug}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: projectUrl },
    openGraph: {
      title: project.title,
      description: project.description,
      url: projectUrl,
      type: "website",
      images: [
        { url: `${baseUrl}/og.png`, width: 1200, height: 628, alt: project.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const views = (await redis.get(["pageviews", "projects", slug].join(":"))) as number | null;
  const viewCount = views ?? 0;

  const mdxSource = await serialize(project.content, { parseFrontmatter: false });

  const projectPageUrl = project.url || `${baseUrl}/projects/${project.slug}`;

  // SoftwareApplication Schema for each project (for search + AI discovery)
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: projectPageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/projects/${project.slug}` },
    applicationCategory: getApplicationCategory(project.slug),
    operatingSystem: getOperatingSystem(project.slug),
    datePublished: project.date,
    author: {
      "@type": "Person",
      "@id": "https://abdirahman.net#person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
      url: "https://abdirahman.net",
    },
    creator: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
    },
    publisher: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
    },
    keywords: getKeywords(project.slug),
    offers: getOffers(project.slug),
    aggregateRating: getAggregateRating(project.slug),
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
      <Script
        id="schema-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Header project={project} views={viewCount} />
      <ReportView slug={project.slug} />

      <div className="px-4 pt-4 pb-2 mx-auto max-w-4xl">
        <Breadcrumb
          variant="dark"
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.title },
          ]}
          currentPageUrl={`/projects/${project.slug}`}
        />
      </div>

      <div className="bg-zinc-800/50 px-4 py-3">
        <div className="mx-auto max-w-4xl flex justify-center">
          <SocialShareButtons
            title={project.title}
            url={`${baseUrl}/projects/${project.slug}`}
            contentType="project"
            itemId={project.slug}
          />
        </div>
      </div>

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-invert prose-quoteless max-w-4xl">
        <Mdx source={mdxSource} />
      </article>

      <nav className="px-4 pb-12 mx-auto max-w-4xl" aria-label="Related links">
        <p className="text-sm text-zinc-400 mb-2">Explore more</p>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <Link href="/projects" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
              All projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function getApplicationCategory(slug: string): string {
  const categoryMap: Record<string, string> = {
    "dna-analysis-system": "HealthcareApplication",
    "iban-swift-validator": "BusinessApplication",
    "email-validator-api": "BusinessApplication",
    "somalia-phone-number-api": "BusinessApplication",
    "nordic-phone-number-api": "BusinessApplication",
    "transfergalaxy": "BusinessApplication",
    "whatsreplay": "WebApplication",
    "somali-geo-api": "BusinessApplication",
    "warya-security-suite": "SecurityApplication",
    "flymind": "WebApplication",
    "somali-digital-id-toolkit": "BusinessApplication",
    "somali-children-books": "EducationalApplication",
  };
  return categoryMap[slug] || "WebApplication";
}

function getOperatingSystem(slug: string): string {
  if (slug.includes("api") || slug === "flymind" || slug === "somali-geo-api" || slug === "warya-security-suite" || slug === "somali-digital-id-toolkit") {
    return "Web, API";
  }
  return "Web";
}

function getKeywords(slug: string): string {
  const keywordsMap: Record<string, string> = {
    "dna-analysis-system": "DNA analysis, genetics, pharmacogenomics, machine learning, health",
    "iban-swift-validator": "IBAN validation, SWIFT code, banking, fintech, API, RapidAPI",
    "email-validator-api": "Email validation, fraud detection, API, RapidAPI",
    "somalia-phone-number-api": "Phone validation, telecom, Somalia, API, RapidAPI",
    "nordic-phone-number-api": "Phone validation, Nordic countries, API, RapidAPI",
    "transfergalaxy": "Money transfer, fintech, payments, co-founded",
    "whatsreplay": "History, education, historical events",
    "somali-geo-api": "Geographic API, Somalia, geography, open-source, GitHub",
    "warya-security-suite": "Security testing, pentesting, cybersecurity, custom algorithms, AI integration, private project",
    "flymind": "Flight search, AI, travel, automation, GitHub",
    "somali-digital-id-toolkit": "Digital identity, ID validation, security, open-source, GitHub",
    "somali-children-books": "Education, cultural preservation, books, Amazon",
  };
  return keywordsMap[slug] || "";
}

function getOffers(slug: string) {
  if (slug.includes("rapidapi") || slug === "iban-swift-validator" || slug === "email-validator-api" || slug.includes("phone-number-api")) {
    return {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: slug === "iban-swift-validator" ? "https://rapidapi.com/gobmedia2/api/iban-swift-validator-51-914-banks" : `https://rapidapi.com/gobmedia2/api/${slug}`,
      description: "Available on RapidAPI with free tier and paid plans",
    };
  }
  if (slug === "somali-children-books") {
    return {
      "@type": "Offer",
      price: "Varies",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.amazon.se/Dhegdheer-Cannibal-Desert-Long-Ears/dp/B0D899G38Q",
      seller: {
        "@type": "Organization",
        name: "Amazon",
      },
    };
  }
  return undefined;
}

function getAggregateRating(slug: string) {
  // Optional: Add ratings if available
  return undefined;
}
