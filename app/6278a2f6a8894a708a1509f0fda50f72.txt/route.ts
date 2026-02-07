import { NextResponse } from "next/server";

const INDEXNOW_KEY = "6278a2f6a8894a708a1509f0fda50f72";

export const dynamic = "force-dynamic";

export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
