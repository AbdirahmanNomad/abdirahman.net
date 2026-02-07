import { NextRequest, NextResponse } from "next/server";
import { getProjects, getPosts } from "@/lib/content";

const BASE_URL = "https://abdirahman.net";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * IndexNow: notify Bing (and other engines) when content changes for faster indexing.
 * GET: submit all site URLs (e.g. from deploy hook).
 * POST: submit custom urlList in body: { "urls": ["https://...", ...] }.
 * Requires INDEXNOW_KEY in env and public/{INDEXNOW_KEY}.txt with key as content.
 * @see https://www.indexnow.org/documentation
 */
export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY not set. Add key and public/{key}.txt for IndexNow." },
      { status: 503 }
    );
  }

  const urls = collectAllUrls();
  return submitToIndexNow(key, urls);
}

export async function POST(request: NextRequest) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY not set. Add key and public/{key}.txt for IndexNow." },
      { status: 503 }
    );
  }

  let body: { urls?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON. Send { urls: string[] }." }, { status: 400 });
  }

  const urls = Array.isArray(body?.urls) ? body.urls : [];
  if (urls.length === 0) {
    return NextResponse.json({ error: "urls array is required and must not be empty." }, { status: 400 });
  }

  const host = new URL(BASE_URL).hostname;
  const invalid = urls.filter((u) => {
    try {
      return new URL(u).hostname !== host;
    } catch {
      return true;
    }
  });
  if (invalid.length > 0) {
    return NextResponse.json(
      { error: "All URLs must belong to " + host, invalid },
      { status: 400 }
    );
  }

  return submitToIndexNow(key, urls);
}

function collectAllUrls(): string[] {
  const staticPaths = ["", "/about", "/contact", "/faq", "/projects", "/blog"];
  const urls = staticPaths.map((p) => (p ? `${BASE_URL}${p}` : BASE_URL));
  getProjects().forEach((p) => urls.push(`${BASE_URL}/projects/${p.slug}`));
  getPosts().forEach((p) => urls.push(`${BASE_URL}/blog/${p.slug}`));
  return urls;
}

async function submitToIndexNow(key: string, urlList: string[]): Promise<NextResponse> {
  const keyLocation = `${BASE_URL}/${key}.txt`;
  const host = new URL(BASE_URL).hostname;

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json(
      { error: "IndexNow submission failed", status: res.status, body: text },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    message: "IndexNow accepted. Bing and other engines will recrawl.",
  });
}
