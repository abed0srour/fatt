"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Star {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function Background() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  // Generated after mount so server and client markup match.
  useEffect(() => {
    setHearts(
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 30,
        opacity: 0.15 + Math.random() * 0.35,
      }))
    );
    setStars(
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div aria-hidden>
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {hearts.map((h, i) => (
        <span
          key={`h-${i}`}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            ["--heart-opacity" as string]: h.opacity,
          }}
        >
          <Heart
            size={h.size}
            className="text-rose-400"
            fill="currentColor"
            strokeWidth={0}
          />
        </span>
      ))}
    </div>
  );
}
