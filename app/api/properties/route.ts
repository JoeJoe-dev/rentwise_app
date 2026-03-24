import { NextResponse } from "next/server";
import { mockProperties } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  // Placeholder: replace with real DB/search query
  const filtered = query
    ? mockProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      )
    : mockProperties;

  return NextResponse.json({ properties: filtered, total: filtered.length });
}
