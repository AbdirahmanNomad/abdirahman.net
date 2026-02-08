import { NextResponse } from "next/server";

const INDEXNOW_KEY = "3a64fda5e8fe428696b7a954659303ee";

export const dynamic = "force-dynamic";

export async function GET() {
  // Return only the key, no newline/BOM (IndexNow validates strictly)
  const body = Buffer.from(INDEXNOW_KEY, "utf-8");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
