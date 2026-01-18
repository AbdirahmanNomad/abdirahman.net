import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/util/redis";

const redis = getRedisClient();
export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  let type: string = "projects"; // Default to projects for backward compatibility
  if ("slug" in body) {
    slug = body.slug;
  }
  if ("type" in body) {
    type = body.type;
  }
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  // Skip Redis operations if not configured (local development)
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new NextResponse(null, { status: 202 });
  }

  const ip = req.ip;
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
      return new NextResponse(null, { status: 202 });
    }
  }
  await redis.incr(["pageviews", type, slug].join(":"));
  return new NextResponse(null, { status: 202 });
}
