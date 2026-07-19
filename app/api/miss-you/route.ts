import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function detectDevice(userAgent: string): string {
  if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(userAgent)) return "Phone";
  return "Computer";
}

// POST /api/miss-you — record a press of the "I miss you too" button
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const userAgent = request.headers.get("user-agent") ?? "";

    const { data, error } = await supabase
      .from("miss_you_responses")
      .insert({ device: detectDevice(userAgent), user_agent: userAgent })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ response: data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/miss-you — list every recorded press, newest first
export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("miss_you_responses")
      .select("id, created_at, device")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ responses: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
