"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface MovieLinkProps {
  href: string;
  name: string;
  poster?: string;
  accent?: string;
}

const POSTER_WIDTH = 120;
const DEFAULT_ACCENT = "#00e054";

export const MovieLink = ({ href, name, poster, accent }: MovieLinkProps) => {
  const [showPoster, setShowPoster] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = event.clientX - rect.left - POSTER_WIDTH / 2;
    const viewportMax = window.innerWidth - rect.left - POSTER_WIDTH - 8;
    const clampedX = Math.min(Math.max(rawX, -rect.left + 8), viewportMax);
    setX(clampedX);
    setY(rect.height);
  };

  const handleEnter = (event: React.MouseEvent) => {
    clearHideTimer();
    handleMouseMove(event);
    setShowPoster(true);
  };

  const scheduleHide = () => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => setShowPoster(false), 120);
  };

  const color = accent ?? DEFAULT_ACCENT;

  return (
    <span ref={containerRef} className="relative inline-block">
      <Link
        href={href}
        target="_blank"
        className="movie-link font-medium"
        style={{
          backgroundImage: `linear-gradient(to top, ${color}66 0%, ${color}66 100%)`,
        }}
        onMouseEnter={handleEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={scheduleHide}
      >
        {name}
      </Link>
      {poster && showPoster && (
        <Link
          href={href}
          target="_blank"
          aria-label={`${name} on Letterboxd`}
          className="absolute z-20 block w-[120px] overflow-hidden rounded-[6px] border border-[#00000020] bg-white shadow-lg"
          style={{ left: x, top: y + 2 }}
          onMouseEnter={clearHideTimer}
          onMouseLeave={scheduleHide}
        >
          <Image
            src={poster}
            alt={`${name} poster`}
            width={POSTER_WIDTH}
            height={180}
            className="block h-auto w-full"
            unoptimized
          />
        </Link>
      )}
    </span>
  );
};
