import { NextResponse } from "next/server";
import { allProjects } from "contentlayer/generated";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const publishedProjects = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    )
    .map((project) => ({
      id: project.slug,
      title: project.title,
      description: project.description,
      date: project.date,
      url: project.url || `https://abdirahman.net/projects/${project.slug}`,
      projectUrl: `https://abdirahman.net/projects/${project.slug}`,
      category: getCategory(project.slug),
      tags: getTags(project.slug),
      technologies: getTechnologies(project.slug),
    }));

  const response = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Abdirahman Ahmed - Projects Portfolio",
    description: "Complete portfolio of projects by Abdirahman Ahmed - Full-stack developer, API creator, and entrepreneur",
    url: "https://abdirahman.net/projects",
    author: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
      url: "https://abdirahman.net",
    },
    totalItems: publishedProjects.length,
    itemListElement: publishedProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        url: project.url,
        applicationCategory: project.category,
        datePublished: project.date,
        author: {
          "@type": "Person",
          name: "Abdirahman Ahmed",
          alternateName: "Maano",
        },
        keywords: project.tags.join(", "),
      },
    })),
    projects: publishedProjects,
  };

  return NextResponse.json(response, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function getCategory(slug: string): string {
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

function getTags(slug: string): string[] {
  const tagsMap: Record<string, string[]> = {
    "dna-analysis-system": ["healthcare", "machine-learning", "genetics", "pharmacogenomics", "health"],
    "iban-swift-validator": ["fintech", "api", "validation", "banking", "rapidapi"],
    "email-validator-api": ["api", "validation", "email", "rapidapi"],
    "somalia-phone-number-api": ["api", "telecom", "validation", "rapidapi", "somalia"],
    "nordic-phone-number-api": ["api", "telecom", "validation", "rapidapi", "nordic"],
    "transfergalaxy": ["fintech", "money-transfer", "payments", "co-founded"],
    "whatsreplay": ["history", "education", "web-app"],
    "somali-geo-api": ["geography", "api", "open-source", "somalia", "github"],
    "warya-security-suite": ["security", "testing", "pentesting", "cybersecurity", "github"],
    "flymind": ["travel", "ai", "automation", "flight-search", "github"],
    "somali-digital-id-toolkit": ["identity", "security", "open-source", "somalia", "github"],
    "somali-children-books": ["education", "cultural-preservation", "books", "amazon"],
  };
  return tagsMap[slug] || [];
}

function getTechnologies(slug: string): string[] {
  const techMap: Record<string, string[]> = {
    "dna-analysis-system": ["Python", "Machine Learning", "XGBoost", "LSTM"],
    "iban-swift-validator": ["API", "RapidAPI", "Python", "FastAPI"],
    "email-validator-api": ["API", "RapidAPI", "Python"],
    "somalia-phone-number-api": ["API", "RapidAPI", "Python"],
    "nordic-phone-number-api": ["API", "RapidAPI", "Python"],
    "transfergalaxy": ["Fintech", "Payment Processing", "Regulated"],
    "whatsreplay": ["Next.js", "React", "TypeScript"],
    "somali-geo-api": ["FastAPI", "Python", "GeoJSON", "PostGIS"],
    "warya-security-suite": ["Python", "Security Tools", "Automation"],
    "flymind": ["FastAPI", "Streamlit", "Playwright", "Python", "n8n"],
    "somali-digital-id-toolkit": ["FastAPI", "Python", "Ed25519", "SQLite"],
    "somali-children-books": ["Publishing", "Amazon"],
  };
  return techMap[slug] || [];
}
