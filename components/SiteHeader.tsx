"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Sparkles } from "lucide-react";

const LINKS = [
  { href: "/", label: "For her" },
  { href: "/responses", label: "Every moment" },
];

export default function SiteHeader() {
  const pathname = usePathname();

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
          <span className="font-display text-base sm:text-lg">
            For Fats
          </span>
          <Sparkles size={13} className="text-amber-200/60" />
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm ${
                  active
                    ? "bg-rose-500/90 text-white shadow-lg shadow-rose-950/40"
                    : "text-stone-300/80 hover:bg-white/[0.07] hover:text-stone-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
