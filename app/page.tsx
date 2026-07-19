"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Heart,
  Loader2,
  Send,
  Sparkles,
  Stars,
} from "lucide-react";
import Background from "@/components/Background";

const BURST_HEARTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return {
    tx: `${Math.cos(angle) * (64 + (i % 4) * 24)}px`,
    ty: `${Math.sin(angle) * (64 + (i % 4) * 24)}px`,
    size: 12 + (i % 4) * 4,
  };
});

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [pressCount, setPressCount] = useState(0);

  const handlePress = async () => {
    if (status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("/api/miss-you", { method: "POST" });
      if (!res.ok) throw new Error("Request failed");

      setPressCount((count) => count + 1);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative flex flex-1 items-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <Background />

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="fade-up hidden min-h-[620px] border border-white/10 bg-[#141017]/80 p-8 shadow-2xl shadow-black/30 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 border border-amber-200/25 bg-amber-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/80">
              <Stars size={15} />
              Since July 21, 2022
            </div>

            <h2 className="font-display max-w-sm text-5xl font-semibold leading-[1.05] text-stone-50">
              A quiet place for the words that stayed.
            </h2>
          </div>

          <div className="relative min-h-72 overflow-hidden border border-white/10 bg-[#1d1821] p-6">
            <div className="absolute inset-x-8 top-12 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-stone-300/55">
                <span>For Fats</span>
                <span>Still here</span>
              </div>

              <div className="mx-auto flex h-28 w-28 items-center justify-center border border-rose-200/30 bg-rose-200/10 shadow-[0_0_80px_rgba(244,114,182,0.2)]">
                <Heart
                  size={48}
                  className="heartbeat text-rose-300"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs text-stone-300/60">
                <span className="border border-white/10 bg-white/[0.03] px-2 py-3">
                  First contact
                </span>
                <span className="border border-white/10 bg-white/[0.03] px-2 py-3">
                  Still waiting
                </span>
                <span className="border border-white/10 bg-white/[0.03] px-2 py-3">
                  One day
                </span>
              </div>
            </div>
          </div>
        </aside>

        <div className="glass fade-up relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 border border-rose-200/20 bg-rose-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-rose-100/80">
              <Sparkles size={15} />
              For Fats
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-rose-200/30 via-white/10 to-transparent sm:block" />
          </div>

          {status === "sent" ? (
            <div className="relative flex min-h-[420px] flex-col items-center justify-center text-center">
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

              <div className="mb-8 flex h-20 w-20 items-center justify-center border border-emerald-200/30 bg-emerald-200/10 text-emerald-200">
                <CheckCircle2 size={38} />
              </div>

              <h1 className="font-display max-w-xl text-4xl font-semibold leading-tight text-stone-50 sm:text-6xl">
                Message sent, hope we meet again.
              </h1>

              <button
                onClick={handlePress}
                className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 border border-rose-200/25 bg-white/[0.06] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-50 transition hover:border-rose-200/45 hover:bg-white/[0.1] active:scale-[0.98]"
              >
                <Send size={17} />
                Send again
              </button>
            </div>
          ) : (
            <div className="grid min-h-[520px] content-between">
              <div>
                <div className="mb-9 flex h-20 w-20 items-center justify-center border border-rose-200/30 bg-rose-200/10">
                  <Heart
                    size={38}
                    className="heartbeat text-rose-300"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>

                <h1 className="font-display max-w-2xl text-5xl font-semibold leading-[1.02] text-stone-50 sm:text-7xl">
                  I miss you.
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-stone-200/72 sm:text-lg">
                  If you see this, it means you&apos;re checking what I made for
                  you. I really miss you. From our first contact on July 21,
                  2022, until now, I am still thinking about you. Still waiting
                  for you. One day Fats.
                </p>
              </div>

              <div className="mt-12">
                {status === "error" && (
                  <p className="mb-4 border border-red-300/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                    Message could not be sent. Please try again.
                  </p>
                )}

                <button
                  onClick={handlePress}
                  disabled={status === "sending"}
                  className="group inline-flex min-h-14 w-full items-center justify-center gap-3 border border-rose-200/20 bg-rose-500 px-7 py-4 text-base font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-rose-950/35 transition hover:bg-rose-400 active:scale-[0.98] disabled:opacity-70 sm:w-auto"
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
