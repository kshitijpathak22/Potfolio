"use client";

import { useEffect, useState } from "react";
import type { AppId } from "@/lib/data";

/**
 * Renders a real macOS icon from /public/icons/<id>.png if that file exists,
 * otherwise a built-in SVG recreation. We preload the PNG with an off-DOM
 * Image() and only swap in the <img> once it actually loads — so a missing
 * icon never shows a broken-image glyph.
 */
export function AppIcon({ id }: { id: AppId }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let live = true;
    const img = new window.Image();
    img.onload = () => live && setOk(true);
    img.onerror = () => live && setOk(false);
    img.src = `/icons/${id}.png`;
    return () => {
      live = false;
    };
  }, [id]);

  if (ok) {
    return (
      <span className={"tile " + id + " has-img"}>
        <img className="app-icon-img" src={`/icons/${id}.png`} alt="" draggable={false} />
      </span>
    );
  }
  return <span className={"tile " + id}>{FALLBACK[id] ?? null}</span>;
}

const FALLBACK: Partial<Record<AppId, React.ReactNode>> = {
  finder: (
    <svg viewBox="0 0 54 54">
      <defs>
        <clipPath id="fc">
          <rect width="54" height="54" rx="13" />
        </clipPath>
      </defs>
      <g clipPath="url(#fc)">
        <rect width="27" height="54" fill="#9ed3ff" />
        <rect x="27" width="27" height="54" fill="#1f7ff0" />
      </g>
      <circle cx="20" cy="23" r="2" fill="#0a2a52" />
      <circle cx="34" cy="23" r="2" fill="#fff" />
      <path d="M18 34 q9 7 18 0" stroke="#0a2a52" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  ),
  notes: (
    <svg viewBox="0 0 54 54">
      <rect width="54" height="54" rx="13" fill="#fff" />
      <rect width="54" height="16" fill="#ffe08a" />
      <rect y="4" width="54" height="12" fill="#ffd35c" />
      <g stroke="#d8b24a" strokeWidth="2">
        <line x1="12" y1="26" x2="42" y2="26" />
        <line x1="12" y1="33" x2="42" y2="33" />
        <line x1="12" y1="40" x2="32" y2="40" />
      </g>
    </svg>
  ),
  safari: (
    <svg viewBox="0 0 44 44">
      <circle cx="22" cy="22" r="21" fill="#fff" />
      <circle cx="22" cy="22" r="21" fill="none" stroke="#dce8f5" strokeWidth="1.4" />
      <g transform="rotate(45 22 22)">
        <path d="M22 7 L26 22 L22 26 Z" fill="#ff3b30" />
        <path d="M22 37 L18 22 L22 18 Z" fill="#9aa7b8" />
      </g>
      <circle cx="22" cy="22" r="2.4" fill="#fff" stroke="#c9d6e6" />
    </svg>
  ),
  photos: <span className="flower" />,
  messages: (
    <svg viewBox="0 0 54 54">
      <path
        d="M27 13c-9 0-16 5.4-16 12 0 3.8 2.4 7 6 9.2-.5 2.8-2.4 5-2.4 5 4-.2 7.2-2 9-3.3 1.1.2 2.2.3 3.4.3 9 0 16-5.4 16-12S36 13 27 13z"
        fill="#fff"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 54 54">
      <rect x="10" y="16" width="34" height="22" rx="4" fill="#fff" />
      <path d="M11 19 L27 30 L43 19" stroke="#1668d8" strokeWidth="2.2" fill="none" />
    </svg>
  ),
  terminal: <span className="tg">&gt;_</span>,
};
