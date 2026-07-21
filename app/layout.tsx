import type { Metadata, Viewport } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import { Heart } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I Miss You, Fatouma",
  description: "A little corner of the internet made just for you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0d13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <footer className="relative z-10 border-t border-white/[0.06] py-5">
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-stone-400/60">
            Made with
            <Heart
              size={12}
              className="text-rose-400"
              fill="currentColor"
              strokeWidth={0}
            />
            since July 21, 2022
          </p>
        </footer>
      </body>
    </html>
  );
}
