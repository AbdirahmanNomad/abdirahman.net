import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { getPosts } from "@/lib/content";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Breadcrumb } from "../components/breadcrumb";
import { Eye } from "lucide-react";
import { getRedisClient } from "@/util/redis";

const redis = getRedisClient();

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Blog",
	description: "Blog & Updates by Abdirahman Ahmed - Project updates, tech insights, tutorials, and announcements about healthcare technology, fintech APIs, security tools, and cultural preservation.",
	keywords: [
		"Abdirahman Ahmed blog",
		"tech insights",
		"project updates",
		"tutorials",
		"API development",
		"healthcare technology",
	],
	alternates: { canonical: "https://abdirahman.net/blog" },
	openGraph: {
		title: "Blog & Updates by Abdirahman Ahmed",
		description: "Project updates, tech insights, tutorials, and announcements",
		url: "https://abdirahman.net/blog",
	},
};

export default async function BlogPage() {
  const publishedPosts = getPosts();
  const viewsArray = await redis.mget(
    ...publishedPosts.map((p) => ["pageviews", "blog", p.slug].join(":")),
  );
  const views = viewsArray.reduce<Record<string, number>>((acc, v, i) => {
    acc[publishedPosts[i].slug] = (v as number | null) ?? 0;
    return acc;
  }, {});

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog" }]} currentPageUrl="/blog" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Blog & Updates
          </h2>
          <p className="mt-4 text-zinc-400">
            Project updates, tech insights, tutorials, and announcements.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post) => (
            <Card key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <article className="p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="text-xs text-zinc-100">
                      {post.date ? (
                        <time dateTime={new Date(post.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(post.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[post.slug] ?? 0,
                      )}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-100 group-hover:text-white sm:text-2xl font-display mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-6 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {post.description}
                  </p>
                  {post.category && (
                    <span className="inline-block mt-3 px-2 py-1 text-xs bg-zinc-800/50 text-zinc-400 rounded border border-zinc-700/50">
                      {post.category}
                    </span>
                  )}
                </article>
              </Link>
            </Card>
          ))}
        </div>

        {publishedPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400">No blog posts yet. Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  );
}
