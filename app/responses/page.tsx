"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Heart,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  CalendarHeart,
  AlertCircle,
} from "lucide-react";
import Background from "@/components/Background";

interface ResponseRow {
  id: string;
  created_at: string;
  device: string | null;
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatFull(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function DeviceIcon({ device }: { device: string | null }) {
  const cls = "text-rose-300/70";
  if (device === "Phone") return <Smartphone size={16} className={cls} />;
  if (device === "Tablet") return <Tablet size={16} className={cls} />;
  return <Monitor size={16} className={cls} />;
}

export default function ResponsesPage() {
  const [rows, setRows] = useState<ResponseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/miss-you", { cache: "no-store" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to load responses");
      setRows(body.responses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const latest = rows[0];
  const first = rows[rows.length - 1];

  return (
    <main className="relative flex flex-1 flex-col items-center overflow-hidden px-4 py-10 sm:px-6">
      <Background />

      <div className="relative z-10 w-full max-w-2xl">
        <header className="fade-up mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-rose-300/80">
              Just for you
            </p>
            <h1 className="font-display text-3xl font-semibold text-rose-50 sm:text-4xl">
              Every time she missed you
            </h1>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-rose-100 transition-all hover:bg-white/10 active:scale-[0.98] disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </header>

        <section className="fade-up mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass rounded-lg p-5 text-center">
            <Heart
              size={20}
              className="mx-auto mb-2 text-rose-400"
              fill="currentColor"
              strokeWidth={0}
            />
            <p className="font-display text-3xl font-semibold text-rose-50">
              {rows.length}
            </p>
            <p className="mt-1 text-xs text-rose-200/60">
              time{rows.length === 1 ? "" : "s"} she pressed it
            </p>
          </div>
          <div className="glass rounded-lg p-5 text-center">
            <Clock size={20} className="mx-auto mb-2 text-rose-300" />
            <p className="text-sm font-medium text-rose-50">
              {latest ? relativeTime(latest.created_at) : "-"}
            </p>
            <p className="mt-1 text-xs text-rose-200/60">most recent</p>
          </div>
          <div className="glass rounded-lg p-5 text-center">
            <CalendarHeart size={20} className="mx-auto mb-2 text-rose-300" />
            <p className="text-sm font-medium text-rose-50">
              {first
                ? new Date(first.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"}
            </p>
            <p className="mt-1 text-xs text-rose-200/60">first time</p>
          </div>
        </section>

        {error && (
          <div className="glass fade-up mb-6 flex items-start gap-3 rounded-lg border-red-400/30 p-5 text-sm text-red-200">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Couldn&apos;t load responses</p>
              <p className="mt-1 text-red-200/70">{error}</p>
            </div>
          </div>
        )}

        {loading && rows.length === 0 && !error ? (
          <div className="glass fade-up rounded-lg p-10 text-center text-rose-200/60">
            Loading her moments...
          </div>
        ) : rows.length === 0 && !error ? (
          <div className="glass fade-up rounded-lg p-10 text-center">
            <Heart size={28} className="mx-auto mb-3 text-rose-400/50" />
            <p className="text-rose-100/80">Nothing yet.</p>
            <p className="mt-1 text-sm text-rose-200/50">
              When she presses &ldquo;I miss you too&rdquo;, it will show up
              here.
            </p>
          </div>
        ) : (
          <ol className="fade-up space-y-3">
            {rows.map((row) => (
              <li
                key={row.id}
                className="glass flex items-center gap-4 rounded-lg p-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/25">
                  <Heart
                    size={18}
                    className="text-rose-400"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-rose-50 sm:text-base">
                    She pressed &ldquo;I miss you too&rdquo;
                  </p>
                  <p className="mt-0.5 text-xs text-rose-200/60 sm:text-sm">
                    {formatFull(row.created_at)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs text-rose-200/50">
                    {relativeTime(row.created_at)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-rose-200/50">
                    <DeviceIcon device={row.device} />
                    <span className="hidden sm:inline">
                      {row.device ?? "Unknown"}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
