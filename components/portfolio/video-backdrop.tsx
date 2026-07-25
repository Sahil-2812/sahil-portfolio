"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { playWhenReady } from "@/lib/video-utils";

const VIDEO_SRC = "/video/footer2.mp4";

type VideoBackdropProps = {
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
};

export function VideoBackdrop({
  children,
  className = "",
  overlayClassName = "bg-black/62",
}: VideoBackdropProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px 120px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.src = VIDEO_SRC;
    video.load();

    const markReady = () => setIsReady(true);
    const cleanupPlay = playWhenReady(video);

    video.addEventListener("canplay", markReady, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      markReady();
    }

    return () => {
      cleanupPlay();
      video.removeEventListener("canplay", markReady);
      video.pause();
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-[1.14] object-cover object-[58%_42%] transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[var(--background)] via-[color-mix(in_srgb,var(--background)_72%,transparent)] to-transparent sm:h-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-[var(--background)] via-[color-mix(in_srgb,var(--background)_85%,transparent)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-[1] h-24 w-72 bg-gradient-to-tl from-[var(--background)] via-[color-mix(in_srgb,var(--background)_75%,transparent)] to-transparent"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
