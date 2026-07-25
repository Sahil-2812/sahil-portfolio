"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

import type { TechLogo } from "@/lib/portfolio-data";

type TechMarqueeProps = {
  items: TechLogo[];
};

function LogoTile({ item }: { item: TechLogo }) {
  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-2xl border border-white/14 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition duration-300 hover:scale-[1.04] hover:border-white/25 hover:bg-white/14 sm:px-5 sm:py-3.5">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/95 p-1.5 shadow-sm">
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-full w-full"
          style={{ fill: `#${item.icon.hex}` }}
        >
          <path d={item.icon.path} />
        </svg>
      </span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white/90">
        {item.label}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: TechLogo[]; reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) {
      return;
    }

    const distance = track.scrollWidth / 2;
    timelineRef.current?.kill();
    timelineRef.current = gsap.fromTo(
      track,
      { x: reverse ? -distance : 0 },
      {
        x: reverse ? 0 : -distance,
        ease: "none",
        duration: 28,
        repeat: -1,
      },
    );

    const pause = () => timelineRef.current?.pause();
    const play = () => timelineRef.current?.play();

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", play);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", play);
      timelineRef.current?.kill();
    };
  }, [items, reverse]);

  return (
    <div ref={containerRef} className="mask-fade-x w-full overflow-hidden py-1">
      <div ref={trackRef} className="flex w-max items-center gap-4 will-change-transform">
        {items.concat(items).map((item, index) => (
          <LogoTile key={`${item.label}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function TechMarquee({ items }: TechMarqueeProps) {
  const midpoint = useMemo(() => Math.ceil(items.length / 2), [items.length]);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <MarqueeRow items={items.slice(0, midpoint)} />
      <MarqueeRow items={items.slice(midpoint)} reverse />
    </div>
  );
}
