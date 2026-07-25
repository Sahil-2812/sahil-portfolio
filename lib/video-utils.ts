export function playWhenReady(video: HTMLVideoElement) {
  const start = () => {
    void video.play().catch(() => {});
  };

  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    start();
    return () => {};
  }

  video.addEventListener("canplay", start, { once: true });
  return () => video.removeEventListener("canplay", start);
}

export function loadVideoSource(video: HTMLVideoElement, src: string) {
  const alreadyLoaded = video.currentSrc.endsWith(src);

  if (alreadyLoaded) {
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      video.addEventListener("canplay", () => resolve(), { once: true });
    });
  }

  video.src = src;
  video.load();

  return new Promise<void>((resolve) => {
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }

    video.addEventListener("canplay", () => resolve(), { once: true });
  });
}
