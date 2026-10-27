"use client";

import { useEffect, useRef, useState } from "react";

const NOTES = ["#1DB954", "#E8964A", "#7BC0F0", "#E86AA6", "#B98CE8"];

const NOTE_PATH =
  "M13.5 1.5v8.2a2.3 2.3 0 1 1-1.2-2V3.6L7.4 4.6v6.9a2.3 2.3 0 1 1-1.2-2V3.2l7.3-1.7z";

interface NoteConfig {
  id: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
  rise: number;
  size: number;
  startRotate: number;
  endRotate: number;
  startBottom: number;
}

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const buildNotes = (count: number): NoteConfig[] => {
  const spread = 34;
  return Array.from({ length: count }, (_, index) => {
    const slot = index / Math.max(count - 1, 1);
    return {
      id: index,
      color: NOTES[index % NOTES.length],
      delay: Math.max(0, (index / count) * 4 + randomBetween(-0.25, 0.25)),
      duration: randomBetween(2.1, 2.8),
      drift: -spread / 2 + slot * spread + randomBetween(-3, 3),
      rise: randomBetween(26, 38),
      size: randomBetween(9, 13),
      startRotate: randomBetween(-15, 15),
      endRotate: randomBetween(-25, 25),
      startBottom: randomBetween(50, 70),
    };
  });
};

export const FloatingNotes = ({ count = 6 }: { count?: number }) => {
  const [notes, setNotes] = useState<NoteConfig[]>([]);
  const generated = useRef(false);

  useEffect(() => {
    if (generated.current) return;
    generated.current = true;
    setNotes(buildNotes(count));
  }, [count]);

  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      <style>{`
        @keyframes note-float {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.5) rotate(var(--start-rotate));
          }
          12% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--drift)), calc(-1 * var(--rise)))
              scale(1.15) rotate(var(--end-rotate));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-note {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
      {notes.map((note) => (
        <svg
          key={note.id}
          viewBox="0 0 16 16"
          role="presentation"
          className="floating-note absolute left-1/2 opacity-0"
          style={{
            fill: note.color,
            width: note.size,
            height: note.size,
            bottom: `${note.startBottom}%`,
            animation: `note-float ${note.duration}s ease-out ${note.delay}s infinite`,
            ["--drift" as string]: `${note.drift}px`,
            ["--rise" as string]: `${note.rise}px`,
            ["--start-rotate" as string]: `${note.startRotate}deg`,
            ["--end-rotate" as string]: `${note.endRotate}deg`,
          }}
        >
          <path d={NOTE_PATH} />
        </svg>
      ))}
    </span>
  );
};
