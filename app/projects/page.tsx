import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { getProjects } from "@/lib/content";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Breadcrumb } from "../components/breadcrumb";
import { Article } from "./article";
import { Eye } from "lucide-react";
import { getRedisClient } from "@/util/redis";

const redis = getRedisClient();

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Projects",
	description: "Projects by Abdirahman Ahmed - DNA Analysis System, IBAN & SWIFT Validator for 51,000+ banks, TransferGalaxy money transfer service, WhatsApp Replay, Somali children's books, and more. Full-stack developer and entrepreneur originally from Somalia, based in Sweden.",
	keywords: [
		"Abdirahman Ahmed projects",
		"DNA Analysis System",
		"IBAN SWIFT Validator API",
		"TransferGalaxy",
		"WhatsApp Replay",
		"Somali children books",
		"fintech API",
		"healthcare technology",
		"API developer Sweden",
	],
	alternates: { canonical: "https://abdirahman.net/projects" },
	openGraph: {
		title: "Projects by Abdirahman Ahmed",
		description: "DNA Analysis System, IBAN & SWIFT Validator, TransferGalaxy, and more projects by Abdirahman Ahmed",
		url: "https://abdirahman.net/projects",
	},
};
export default async function ProjectsPage() {
  const publishedProjects = getProjects();
  const viewsArray = await redis.mget(
    ...publishedProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
  );
  const views = viewsArray.reduce<Record<string, number>>((acc, v, i) => {
    acc[publishedProjects[i].slug] = (v as number | null) ?? 0;
    return acc;
  }, {});

  // Rotate featured projects based on current date to show different ones each day
  const seed = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)); // Changes daily
  const shuffled = [...publishedProjects];
  // Fisher-Yates shuffle with seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed + i) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  const featured = shuffled[0];
  const top2 = shuffled[1];
  const top3 = shuffled[2];
  const sorted = shuffled.slice(3);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Projects" }]} currentPageUrl="/projects" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {featured && (
            <Card>
              <Link href={`/projects/${featured.slug}`}>
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
                      {featured.date ? (
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {featured.description}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          )}

          {(top2 || top3) && (
            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].filter(Boolean).map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
