import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function detectDevice(userAgent: string): string {
  if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(userAgent)) return "Phone";
  return "Computer";
}

function getNestEndpoint() {
  const base = process.env.NEST_API_URL?.replace(/\/$/, "");
  return base ? `${base}/miss-you` : null;
}

async function forwardToNest(request: NextRequest, method: "GET" | "POST") {
  const endpoint = getNestEndpoint();
  if (!endpoint) return null;

  const response = await fetch(endpoint, {
    method,
    cache: "no-store",
    headers:
      method === "POST"
        ? { "user-agent": request.headers.get("user-agent") ?? "" }
        : undefined,
  });

  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

async function tryForwardToNest(request: NextRequest, method: "GET" | "POST") {
  try {
    return await forwardToNest(request, method);
  } catch (err) {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw err;
    }

    return null;
  }
}

// POST /api/miss-you records a press of the "I miss you too" button.
export async function POST(request: NextRequest) {
  try {
    const proxied = await tryForwardToNest(request, "POST");
    if (proxied) return proxied;

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

    return NextResponse.json(
      {
        message: "Message sent, hope we meet again",
        response: data,
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/miss-you lists every recorded press, newest first.
export async function GET(request: NextRequest) {
  try {
    const proxied = await tryForwardToNest(request, "GET");
    if (proxied) return proxied;

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
