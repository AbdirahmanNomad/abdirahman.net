import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { getRedisClient } from "@/util/redis";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { ReportView } from "./view";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = getRedisClient();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allPosts
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const views = (await redis.get(["pageviews", "blog", slug].join(":"))) as number | null;
  const viewCount = views ?? 0;

  // BlogPosting Schema
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
      url: "https://abdirahman.net",
    },
    publisher: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://abdirahman.net/blog/${post.slug}`,
    },
  };

  return (
    <div className="bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 min-h-screen">
      <Script
        id="schema-blog-posting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Navigation />
      <ReportView slug={slug} />
      
      <div className="container mx-auto px-6 pt-24 pb-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 mb-8 duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-sm text-zinc-400">
              {post.date ? (
                <time dateTime={new Date(post.date).toISOString()}>
                  {Intl.DateTimeFormat(undefined, {
                    dateStyle: "long",
                  }).format(new Date(post.date))}
                </time>
              ) : (
                <span>Draft</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-sm text-zinc-500">
              <Eye className="w-4 h-4" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(viewCount)}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display mb-4">
            {post.title}
          </h1>
          
          {post.category && (
            <span className="inline-block px-3 py-1 text-sm bg-zinc-800/50 text-zinc-400 rounded border border-zinc-700/50">
              {post.category}
            </span>
          )}
        </header>

        <article className="prose prose-zinc prose-quoteless max-w-none prose-invert">
          <Mdx code={post.body.code} />
        </article>
      </div>
    </div>
  );
}
