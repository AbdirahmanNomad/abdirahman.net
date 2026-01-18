import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { getRedisClient } from "@/util/redis";
import Script from "next/script";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = getRedisClient();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views = (await redis.get(["pageviews", "projects", slug].join(":"))) as number | null;
  const viewCount = views ?? 0;

  // SoftwareApplication Schema for each project
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.url || `https://abdirahman.net/projects/${project.slug}`,
    applicationCategory: getApplicationCategory(project.slug),
    operatingSystem: getOperatingSystem(project.slug),
    datePublished: project.date,
    author: {
      "@type": "Person",
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
    <div className="bg-zinc-50 min-h-screen">
      <Script
        id="schema-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Header project={project} views={viewCount} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
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
    "warya-security-suite": "Security testing, pentesting, cybersecurity, GitHub",
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
