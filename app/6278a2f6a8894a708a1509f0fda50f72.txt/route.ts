import { NextResponse } from "next/server";

const INDEXNOW_KEY = "6278a2f6a8894a708a1509f0fda50f72";

export const dynamic = "force-dynamic";

export async function GET() {
  // Return only the key, no newline/BOM (Bing validates strictly)
  const body = Buffer.from(INDEXNOW_KEY, "utf-8");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
