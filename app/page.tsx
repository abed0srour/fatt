"use client";

import { useState } from "react";
import { Heart, Loader2, MailCheck, Sparkles } from "lucide-react";
import Background from "@/components/Background";

const BURST_HEARTS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return {
    tx: `${Math.cos(angle) * (70 + (i % 3) * 30)}px`,
    ty: `${Math.sin(angle) * (70 + (i % 3) * 30)}px`,
    size: 14 + (i % 4) * 5,
  };
});

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [pressCount, setPressCount] = useState(0);
  const [sentAt, setSentAt] = useState<Date | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

  const handlePress = async () => {
    if (status === "sending") return;
    setStatus("sending");
    setSaveFailed(false);

    try {
      const res = await fetch("/api/miss-you", { method: "POST" });
      if (!res.ok) setSaveFailed(true);
    } catch {
      setSaveFailed(true);
    }

    setSentAt(new Date());
    setPressCount((c) => c + 1);
    setStatus("sent");
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <Background />

      <div className="glass fade-up relative z-10 w-full max-w-lg rounded-3xl p-8 text-center sm:p-12">
        {status !== "sent" ? (
          <>
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/30">
              <Heart
                size={38}
                className="heartbeat text-rose-400"
                fill="currentColor"
                strokeWidth={0}
              />
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-rose-300/80">
              For Fatouma
            </p>

            <h1 className="font-display mb-6 text-4xl font-semibold leading-tight text-rose-50 sm:text-5xl">
              I miss you.
            </h1>

            <p className="mx-auto mb-10 max-w-sm text-base leading-relaxed text-rose-100/70 sm:text-lg">
              Every day feels a little longer without you. I made this small
              corner of the internet just to tell you that.
            </p>

            <button
              onClick={handlePress}
              disabled={status === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-900/40 transition-all hover:scale-[1.03] hover:shadow-rose-800/50 active:scale-[0.98] disabled:opacity-70 sm:w-auto"
            >
              {status === "sending" ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                <Heart
                  size={22}
                  className="transition-transform group-hover:scale-110"
                  fill="currentColor"
                  strokeWidth={0}
                />
              )}
              I miss you too
            </button>
          </>
        ) : (
          <div className="relative">
            {BURST_HEARTS.map((h, i) => (
              <span
                key={`${pressCount}-${i}`}
                className="burst-heart text-rose-400"
                style={{
                  ["--tx" as string]: h.tx,
                  ["--ty" as string]: h.ty,
                }}
              >
                <Heart size={h.size} fill="currentColor" strokeWidth={0} />
              </span>
            ))}

            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/30">
              <MailCheck size={36} className="text-rose-300" />
            </div>

            <h2 className="font-display mb-4 text-3xl font-semibold text-rose-50 sm:text-4xl">
              He&apos;ll know 💌
            </h2>

            <p className="mx-auto mb-2 max-w-sm text-base leading-relaxed text-rose-100/70 sm:text-lg">
              Your &ldquo;I miss you too&rdquo; is on its way to him.
            </p>

            {sentAt && (
              <p className="mb-8 text-sm text-rose-200/50">
                Sent{" "}
                {sentAt.toLocaleString(undefined, {
                  weekday: "long",
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {saveFailed && " — but the connection hiccuped, try once more 🥺"}
              </p>
            )}

            <button
              onClick={handlePress}
              disabled={status !== "sent"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-300/30 bg-white/5 px-6 py-3 text-base font-medium text-rose-100 transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              <Sparkles size={18} className="text-rose-300" />
              Tell him again
            </button>
          </div>
        )}
      </div>

      <p className="relative z-10 mt-8 text-center text-xs text-rose-200/40">
        Made with all my heart, for you.
      </p>
    </main>
  );
}
