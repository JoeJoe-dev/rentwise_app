import { NextResponse } from "next/server";
import { mockServices } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.toLowerCase() ?? "";

  // Placeholder: replace with real DB query
  const filtered = category
    ? mockServices.filter((s) => s.category.toLowerCase() === category)
    : mockServices;

  return NextResponse.json({ services: filtered });
}
