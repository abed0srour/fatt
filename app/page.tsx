"use client";

import { useState } from "react";
import {
  Heart,
  Loader2,
  PenLine,
  Send,
  Sparkles,
  Stars,
} from "lucide-react";
import Background from "@/components/Background";
import SinceCounter from "@/components/SinceCounter";

const MESSAGE_MAX_LENGTH = 500;

const BURST_HEARTS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return {
    tx: `${Math.cos(angle) * (70 + (i % 4) * 26)}px`,
    ty: `${Math.sin(angle) * (70 + (i % 4) * 26)}px`,
    size: 12 + (i % 4) * 4,
  };
});

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [pressCount, setPressCount] = useState(0);

  const handlePress = async () => {
    if (status === "sending") return;

    setStatus("sending");
    const note = message.trim();

    try {
      const res = await fetch("/api/miss-you", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: note || null }),
      });
      if (!res.ok) throw new Error("Request failed");

      setPressCount((count) => count + 1);
      setSentMessage(note || null);
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative flex flex-1 items-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <Background />

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        {/* ---- left poetic panel (desktop only) ---- */}
        <aside className="fade-up hidden min-h-[640px] rounded-3xl border border-white/10 bg-[#141017]/80 p-8 shadow-2xl shadow-black/30 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/80">
              <Stars size={15} />
              Still waiting
            </div>

            <h2 className="font-display max-w-sm text-5xl font-semibold leading-[1.05] text-stone-50">
              A quiet place for the words that stayed.
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1d1821] p-6">
            <div className="divider-shimmer absolute inset-x-8 top-10" />
            <div className="divider-shimmer absolute bottom-8 left-8 right-8 opacity-60" />

            <div className="relative flex flex-col gap-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-stone-300/55">
                <span>For Fats</span>
                <span>Still here</span>
              </div>

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-rose-200/30 bg-rose-200/10 shadow-[0_0_80px_rgba(244,114,182,0.22)]">
                <Heart
                  size={42}
                  className="heartbeat text-rose-300"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>

              <SinceCounter />
            </div>
          </div>
        </aside>

        {/* ---- main card ---- */}
        <div className="glass fade-up fade-up-delay-1 relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-100/80">
              <Sparkles size={15} />
              Made for you
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-rose-200/30 via-white/10 to-transparent sm:block" />
          </div>

          {status === "sent" ? (
            <div className="relative flex min-h-[440px] flex-col items-center justify-center py-6 text-center">
              {BURST_HEARTS.map((heart, i) => (
                <span
                  key={`${pressCount}-${i}`}
                  className="burst-heart text-rose-300"
                  style={{
                    ["--tx" as string]: heart.tx,
                    ["--ty" as string]: heart.ty,
                  }}
                >
                  <Heart size={heart.size} fill="currentColor" strokeWidth={0} />
                </span>
              ))}

              <div className="pop-in relative mb-8 flex h-24 w-24 items-center justify-center">
                <span className="ring-pulse absolute inset-0 rounded-full border border-rose-300/40" />
                <span
                  className="ring-pulse absolute inset-0 rounded-full border border-rose-300/30"
                  style={{ animationDelay: "0.6s" }}
                />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-700 shadow-[0_18px_60px_-12px_rgba(244,63,107,0.65)]" />
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
                <Heart
                  size={40}
                  className="heartbeat relative text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>

              <p className="pop-in mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/70">
                Delivered with love
              </p>

              <h1 className="font-display max-w-xl text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl lg:text-6xl">
                Sent. Hope we meet again.
              </h1>

              {sentMessage && (
                <blockquote className="glass-soft mt-6 max-w-md rounded-2xl px-6 py-4 text-sm italic leading-7 text-rose-100/85 sm:text-base">
                  &ldquo;{sentMessage}&rdquo;
                </blockquote>
              )}

              <button
                onClick={() => setStatus("idle")}
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-rose-200/25 bg-white/[0.06] px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-rose-50 transition hover:border-rose-200/45 hover:bg-white/[0.1] active:scale-[0.98]"
              >
                <Send size={16} />
                Send another
              </button>
            </div>
          ) : (
            <div className="flex min-h-[520px] flex-col justify-between gap-8">
              <div>
                <div className="mb-8 flex h-18 w-18 items-center justify-center rounded-2xl border border-rose-200/30 bg-rose-200/10 p-4">
                  <Heart
                    size={36}
                    className="heartbeat text-rose-300"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>

                <h1 className="font-display max-w-2xl text-5xl font-semibold leading-[1.02] text-stone-50 sm:text-6xl lg:text-7xl">
                  I miss you.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-stone-200/72 sm:text-lg">
                  If you see this, it means you&apos;re checking what I made for
                  you. I really miss you. From our first contact on July 21,
                  2022, until now, I am still thinking about you. Still waiting
                  for you. One day Fats.
                </p>

                {/* counter is inside the aside on desktop; show it inline on smaller screens */}
                <div className="mt-8 lg:hidden">
                  <SinceCounter />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-300/60">
                  <PenLine size={14} />
                  Leave a few words (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value.slice(0, MESSAGE_MAX_LENGTH))
                  }
                  rows={3}
                  placeholder="Anything you want to say back..."
                  className="glass-soft w-full resize-none rounded-2xl px-4 py-3.5 text-sm leading-6 text-stone-100 outline-none transition placeholder:text-stone-400/45 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20 sm:text-base"
                />
                <p className="mt-1.5 text-right text-xs tabular-nums text-stone-400/50">
                  {message.length}/{MESSAGE_MAX_LENGTH}
                </p>

                {status === "error" && (
                  <p className="mb-4 mt-2 rounded-xl border border-red-300/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                    Message could not be sent. Please try again.
                  </p>
                )}

                <button
                  onClick={handlePress}
                  disabled={status === "sending"}
                  className="btn-love group mt-3 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-70 sm:w-auto"
                >
                  {status === "sending" ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Heart
                      size={20}
                      className="transition-transform group-hover:scale-110"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  )}
                  I miss you too
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
