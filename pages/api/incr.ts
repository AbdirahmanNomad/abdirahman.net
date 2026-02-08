import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/util/redis";

export default async function incr(req: NextRequest): Promise<NextResponse> {
  const redis = getRedisClient();
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  let type: string = "projects";
  if ("slug" in body && typeof body.slug === "string") {
    slug = body.slug;
  }
  if ("type" in body && typeof body.type === "string") {
    type = body.type;
  }
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }
  // Restrict to safe chars for Redis keys (alphanumeric, hyphen)
  if (!/^[a-z0-9-]+$/i.test(slug) || slug.length > 120) {
    return new NextResponse("Invalid slug", { status: 400 });
  }
  if (type !== "blog" && type !== "projects") {
    return new NextResponse("Invalid type", { status: 400 });
  }

  // Skip Redis operations if not configured (local development)
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ incremented: false, reason: "redis_not_configured" }, { status: 202 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;
  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug (include type to separate projects and blog)
    const dedupeKey = ["deduplicate", hash, type, slug].join(":");
    const isNew = await redis.set(dedupeKey, true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      return NextResponse.json({ incremented: false, reason: "deduplicated_same_ip_24h" }, { status: 202 });
    }
  }
  const count = await redis.incr(["pageviews", type, slug].join(":"));
  return NextResponse.json({ incremented: true, count }, { status: 202 });
}
