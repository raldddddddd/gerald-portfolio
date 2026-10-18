"use client";

import { useEffect, useState } from "react";

type ProjectImage = { src: string; alt: string };

export function ProjectImageCarousel({ images, projectName }: { images: ProjectImage[]; projectName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [images.length, paused]);

  const activeImage = images[activeIndex];
  if (!activeImage) return null;

  return (
    <div
      className="project-image-carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-label={`${projectName} screenshots`}
    >
      <img className="project-image" src={activeImage.src} alt={activeImage.alt} />
      <span className="project-image-count" aria-hidden="true">
        {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>
    </div>
  );
}
