"use client";

import { useRef, useState } from "react";
import { HoverLink } from "./hoverlink";

interface SongLinkProps {
  href: string;
  name: string;
  embedUrl?: string;
}

const EMBED_WIDTH = 320;
const EMBED_HEIGHT = 152;

export const SongLink = ({ href, name, embedUrl }: SongLinkProps) => {
  const [showEmbed, setShowEmbed] = useState(false);
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
    const rawX = event.clientX - rect.left - EMBED_WIDTH / 2;
    const viewportMax = window.innerWidth - rect.left - EMBED_WIDTH - 8;
    const clampedX = Math.min(Math.max(rawX, -rect.left + 8), viewportMax);
    setX(clampedX);
    setY(rect.height);
  };

  const handleEnter = (event: React.MouseEvent) => {
    clearHideTimer();
    handleMouseMove(event);
    setShowEmbed(true);
  };

  const scheduleHide = () => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => setShowEmbed(false), 120);
  };

  return (
    <span ref={containerRef} className="relative inline-block">
      <HoverLink
        href={href}
        color="#1DB954"
        className="cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={scheduleHide}
      >
        {name}
      </HoverLink>
      {embedUrl && (
        <span
          className={`absolute z-20 block overflow-hidden rounded-[8px] border border-[#00000020] bg-white shadow-lg transition-opacity duration-150 ${
            showEmbed ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            left: x,
            top: y + 4,
            width: EMBED_WIDTH,
            height: EMBED_HEIGHT,
          }}
          aria-hidden={!showEmbed}
          onMouseEnter={clearHideTimer}
          onMouseLeave={scheduleHide}
        >
          <iframe
            title={`${name} on Spotify`}
            src={embedUrl}
            width={EMBED_WIDTH}
            height={EMBED_HEIGHT}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            tabIndex={-1}
            className="block"
          />
        </span>
      )}
    </span>
  );
};
