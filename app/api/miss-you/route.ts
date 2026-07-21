import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const MESSAGE_MAX_LENGTH = 500;

function detectDevice(userAgent: string): string {
  if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(userAgent)) return "Phone";
  return "Computer";
}

async function readMessage(request: NextRequest): Promise<string | null> {
  try {
    const body = await request.json();
    if (typeof body?.message !== "string") return null;
    return body.message.trim().slice(0, MESSAGE_MAX_LENGTH) || null;
  } catch {
    return null;
  }
}

function getNestEndpoint() {
  const base = process.env.NEST_API_URL?.replace(/\/$/, "");
  return base ? `${base}/miss-you` : null;
}

async function forwardToNest(
  request: NextRequest,
  method: "GET" | "POST",
  message: string | null
) {
  const endpoint = getNestEndpoint();
  if (!endpoint) return null;

  const response = await fetch(endpoint, {
    method,
    cache: "no-store",
    headers:
      method === "POST"
        ? {
            "user-agent": request.headers.get("user-agent") ?? "",
            "content-type": "application/json",
          }
        : undefined,
    body: method === "POST" ? JSON.stringify({ message }) : undefined,
  });

  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

async function tryForwardToNest(
  request: NextRequest,
  method: "GET" | "POST",
  message: string | null = null
) {
  try {
    return await forwardToNest(request, method, message);
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
    const message = await readMessage(request);

    const proxied = await tryForwardToNest(request, "POST", message);
    if (proxied) return proxied;

    const supabase = getSupabase();
    const userAgent = request.headers.get("user-agent") ?? "";

    const { data, error } = await supabase
      .from("miss_you_responses")
      .insert({
        device: detectDevice(userAgent),
        user_agent: userAgent,
        message,
      })
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
      .select("id, created_at, device, message")
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
