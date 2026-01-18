import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Read the base llms.txt file
  const filePath = path.join(process.cwd(), "public", "llms.txt");
  let content = fs.readFileSync(filePath, "utf-8");

  // Replace the date reference with current date (handles both old format and placeholder)
  content = content.replace(/as of (?:January )?2026/gi, `as of ${monthYear}`);
  content = content.replace(/as of \{\{CURRENT_DATE\}\}/gi, `as of ${monthYear}`);

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
