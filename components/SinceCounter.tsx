"use client";

import { useSyncExternalStore } from "react";

// First contact: July 21, 2022.
const SINCE = new Date("2022-07-21T00:00:00");

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

// null on the server so the SSR output never mismatches the ticking clock.
function useNowSeconds(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-soft flex flex-col items-center rounded-xl px-2 py-3 sm:px-3">
      <span className="font-display text-2xl font-semibold tabular-nums text-stone-50 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-stone-300/55 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function SinceCounter() {
  const now = useNowSeconds();
  const totalSeconds =
    now === null ? 0 : Math.max(0, now - Math.floor(SINCE.getTime() / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/70">
        Thinking about you for
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <Unit value={days} label="days" />
        <Unit value={hours} label="hours" />
        <Unit value={minutes} label="min" />
        <Unit value={seconds} label="sec" />
      </div>
    </div>
  );
}
