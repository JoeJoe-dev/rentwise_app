import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, role } = body;

  // Placeholder: replace with real auth logic (e.g. NextAuth, Supabase, etc.)
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: "user-001",
      name: "Alex Johnson",
      email,
      role: role ?? "tenant",
      verified: false,
    },
    token: "placeholder-jwt-token",
  });
}
