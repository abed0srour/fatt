import Link from "next/link";
import { Heart, Stars } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0f0d13]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-wide text-stone-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/30 transition group-hover:bg-rose-500/25">
            <Heart
              size={15}
              className="text-rose-400"
              fill="currentColor"
              strokeWidth={0}
            />
          </span>
          <span className="font-display text-base sm:text-lg">For Fats</span>
        </Link>

        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/70 sm:text-xs">
          <Stars size={13} />
          Since July 21, 2022
        </span>
      </div>
    </header>
  );
}
