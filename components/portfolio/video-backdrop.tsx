"use client";

import { ReactNode, useEffect, useRef } from "react";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {});
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-[1.14] object-cover object-[58%_42%]"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
      {/* Seamless blend from page background into video section */}
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
