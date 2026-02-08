import { NextResponse } from "next/server";

/**
 * GET /api/redis-check — Verify Upstash Redis env vars are available at runtime.
 * Returns { redis: "configured" | "not_configured" }. No secrets exposed.
 */
export async function GET() {
  const hasUrl = Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim(),
  );
  const hasToken = Boolean(
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
  const configured = hasUrl && hasToken;
  return NextResponse.json({
    redis: configured ? "configured" : "not_configured",
    hasUrl,
    hasToken,
  });
}
