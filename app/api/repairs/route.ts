import { NextResponse } from "next/server";
import { mockRepairs } from "@/lib/mockData";

export async function GET() {
  // Placeholder: replace with real DB query
  return NextResponse.json({ repairs: mockRepairs });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, priority } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  // Placeholder: persist to DB here
  const newTicket = {
    id: `TKT-${Date.now()}`,
    title,
    status: "reported",
    priority: priority ?? "medium",
    reportedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    progress: 0,
  };

  return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
}
