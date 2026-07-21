"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarHeart,
  Clock,
  Heart,
  MessageCircleHeart,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import Background from "@/components/Background";

interface ResponseRow {
  id: string;
  created_at: string;
  device: string | null;
  message: string | null;
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

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function dayLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(date, today)) return "Today";
  if (sameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year:
      date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });
}

function DeviceIcon({ device }: { device: string | null }) {
  const cls = "text-rose-300/70";
  if (device === "Phone") return <Smartphone size={14} className={cls} />;
  if (device === "Tablet") return <Tablet size={14} className={cls} />;
  return <Monitor size={14} className={cls} />;
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="glass rounded-2xl p-4 text-center sm:p-5">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/12 text-rose-300 ring-1 ring-rose-400/20">
        {icon}
      </div>
      <p className="font-display truncate text-xl font-semibold text-rose-50 sm:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-rose-200/60 sm:text-xs">{label}</p>
    </div>
  );
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
  const notesCount = useMemo(
    () => rows.filter((row) => row.message).length,
    [rows]
  );

  const groups = useMemo(() => {
    const byDay = new Map<string, ResponseRow[]>();
    for (const row of rows) {
      const key = dayLabel(row.created_at);
      const bucket = byDay.get(key);
      if (bucket) bucket.push(row);
      else byDay.set(key, [row]);
    }
    return Array.from(byDay.entries());
  }, [rows]);

  return (
    <main className="relative flex flex-1 flex-col items-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
      <Background />

      <div className="relative z-10 w-full max-w-2xl">
        <header className="fade-up mb-7 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
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

        <section className="fade-up mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            icon={
              <Heart size={16} fill="currentColor" strokeWidth={0} />
            }
            value={rows.length}
            label={`time${rows.length === 1 ? "" : "s"} she pressed it`}
          />
          <StatCard
            icon={<MessageCircleHeart size={16} />}
            value={notesCount}
            label={`note${notesCount === 1 ? "" : "s"} she left`}
          />
          <StatCard
            icon={<Clock size={16} />}
            value={latest ? relativeTime(latest.created_at) : "-"}
            label="most recent"
          />
          <StatCard
            icon={<CalendarHeart size={16} />}
            value={
              first
                ? new Date(first.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"
            }
            label="first time"
          />
        </section>

        {error && (
          <div className="glass fade-up mb-6 flex items-start gap-3 rounded-2xl border-red-400/30 p-5 text-sm text-red-200">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Couldn&apos;t load responses</p>
              <p className="mt-1 text-red-200/70">{error}</p>
            </div>
          </div>
        )}

        {loading && rows.length === 0 && !error ? (
          <div className="glass fade-up rounded-2xl p-10 text-center text-rose-200/60">
            Loading her moments...
          </div>
        ) : rows.length === 0 && !error ? (
          <div className="glass fade-up rounded-2xl p-10 text-center">
            <Heart size={28} className="mx-auto mb-3 text-rose-400/50" />
            <p className="text-rose-100/80">Nothing yet.</p>
            <p className="mt-1 text-sm text-rose-200/50">
              When she presses &ldquo;I miss you too&rdquo;, it will show up
              here.
            </p>
          </div>
        ) : (
          <div className="fade-up fade-up-delay-1 space-y-7">
            {groups.map(([day, dayRows]) => (
              <section key={day}>
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">
                    {day}
                  </h2>
                  <div className="divider-shimmer flex-1 opacity-50" />
                  <span className="shrink-0 text-xs text-stone-400/60">
                    {dayRows.length}×
                  </span>
                </div>

                <ol className="space-y-3">
                  {dayRows.map((row) => (
                    <li
                      key={row.id}
                      className="glass rounded-2xl p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/25">
                          <Heart
                            size={16}
                            className="text-rose-400"
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-rose-50 sm:text-base">
                            She pressed &ldquo;I miss you too&rdquo;
                          </p>
                          <p className="mt-0.5 text-xs text-rose-200/60">
                            {formatTime(row.created_at)} ·{" "}
                            {relativeTime(row.created_at)}
                          </p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-rose-200/60">
                          <DeviceIcon device={row.device} />
                          <span className="hidden sm:inline">
                            {row.device ?? "Unknown"}
                          </span>
                        </span>
                      </div>

                      {row.message && (
                        <blockquote className="glass-soft mt-3 rounded-xl border-l-2 border-l-rose-400/50 px-4 py-3 text-sm italic leading-6 text-rose-100/85">
                          &ldquo;{row.message}&rdquo;
                        </blockquote>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
