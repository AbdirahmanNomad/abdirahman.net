import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const currentYear = new Date().getFullYear();
  const startYear = 2026; // Year when copyright started

  // Read the base LICENSE file
  const filePath = path.join(process.cwd(), "LICENSE");
  let content = fs.readFileSync(filePath, "utf-8");

  // Replace the copyright year - use range format if current year is different
  const copyrightYear = currentYear > startYear ? `${startYear}-${currentYear}` : `${startYear}`;
  content = content.replace(/Copyright \(c\) 2026/g, `Copyright (c) ${copyrightYear}`);

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
