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

const HEARTS: FloatingHeart[] = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 17 + 8) % 96,
  size: 12 + (i % 5) * 4,
  duration: 18 + (i % 6) * 3,
  delay: -1 * (i * 2.4),
  opacity: 0.12 + (i % 4) * 0.06,
}));

const STARS: Star[] = Array.from({ length: 38 }, (_, i) => ({
  left: (i * 29 + 11) % 100,
  top: (i * 47 + 7) % 100,
  duration: 2.2 + (i % 5) * 0.7,
  delay: (i % 8) * 0.35,
}));

export default function Background() {
  return (
    <div aria-hidden>
      {STARS.map((s, i) => (
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
      {HEARTS.map((h, i) => (
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
            className="text-rose-300/60"
            fill="currentColor"
            strokeWidth={0}
          />
        </span>
      ))}
    </div>
  );
}
