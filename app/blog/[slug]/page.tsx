import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getPost, getPosts } from "@/lib/content";
import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { getRedisClient } from "@/util/redis";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { ReportView } from "./view";
import { ReadingProgress } from "@/app/components/reading-progress";
import { SocialShareButtons } from "@/app/components/social-share-buttons";
import type { Metadata } from "next";

export const revalidate = 60;

const baseUrl = "https://abdirahman.net";

type Props = {
  params: Promise<{ slug: string }>;
};

const redis = getRedisClient();

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title} | Abdirahman Ahmed`;
  return {
    title,
    description: post.description,
    alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date ?? undefined,
      images: [
        { url: `${baseUrl}/og.png`, width: 1200, height: 628, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const views = (await redis.get(["pageviews", "blog", slug].join(":"))) as number | null;
  const viewCount = views ?? 0;

  const allPosts = getPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const wordCount = (post.body?.raw ?? "").split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const mdxSource = await serialize(post.content, { parseFrontmatter: false });

  // BlogPosting Schema
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${baseUrl}/og.png`,
    author: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    wordCount,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${baseUrl}/blog/${post.slug}` },
    ],
  };

  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <div className="bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 min-h-screen">
      <ReadingProgress postSlug={slug} />
      <Script
        id="schema-blog-posting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              {post.date ? (
                <time dateTime={new Date(post.date).toISOString()}>
                  {Intl.DateTimeFormat(undefined, {
                    dateStyle: "long",
                  }).format(new Date(post.date))}
                </time>
              ) : (
                <span>Draft</span>
              )}
              <span aria-hidden="true">·</span>
              <span>{readTimeMinutes} min read</span>
            </div>
            <span className="flex items-center gap-1 text-sm text-zinc-500">
              <Eye className="w-4 h-4" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(viewCount)}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display mb-4">
            {post.title}
          </h1>

          <div className="mb-4">
            <SocialShareButtons
              title={post.title}
              url={postUrl}
              contentType="blog_post"
              itemId={slug}
            />
          </div>
          
          {post.category && (
            <span className="inline-block px-3 py-1 text-sm bg-zinc-800/50 text-zinc-400 rounded border border-zinc-700/50">
              {post.category}
            </span>
          )}
        </header>

        <article className="prose prose-zinc prose-quoteless max-w-none prose-invert">
          <Mdx source={mdxSource} />
        </article>

        <section className="mt-12 pt-8 border-t border-zinc-700" aria-label="About the author">
          <p className="text-sm text-zinc-400 mb-1">About the author</p>
          <p className="text-zinc-300">
            <Link href="/about" className="text-zinc-100 hover:text-white underline underline-offset-2 font-medium">
              Abdirahman Ahmed (Maano)
            </Link>
            {" "}
            is a full-stack developer and entrepreneur originally from Somalia, based in Sweden. Creator of DNA Analysis System, IBAN & SWIFT Validator, TransferGalaxy, and Somali children&apos;s books.
          </p>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-8 pt-8 border-t border-zinc-700" aria-label="Related posts">
            <p className="text-sm text-zinc-400 mb-3">Related posts</p>
            <ul className="space-y-2">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="mt-12 pt-8 border-t border-zinc-700" aria-label="Related links">
          <p className="text-sm text-zinc-400 mb-3">Explore more</p>
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <Link href="/blog" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
                All blog posts
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
                Projects
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
    </div>
  );
}
