"use client";

import { useEffect, useState } from "react";

type ProjectImage = { src: string; alt: string };

export function ProjectImageCarousel({
  images,
  imagesPerSlide = 1,
  intervalMs = 4000,
  projectName,
  className = "",
}: {
  images: ProjectImage[];
  imagesPerSlide?: number;
  intervalMs?: number;
  projectName: string;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = Array.from({ length: Math.ceil(images.length / imagesPerSlide) }, (_, slideIndex) =>
    images.slice(slideIndex * imagesPerSlide, (slideIndex + 1) * imagesPerSlide),
  );

  useEffect(() => {
    if (slides.length < 2 || paused) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [slides.length, intervalMs, paused]);

  const activeSlide = slides[activeIndex];
  if (!activeSlide?.length) return null;

  return (
    <div
      className={`project-image-carousel${imagesPerSlide > 1 ? " project-image-carousel--grouped" : ""}${className ? ` ${className}` : ""}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-label={`${projectName} screenshots`}
    >
      <div className="project-image-slide">
        {activeSlide.map((image) => (
          <img key={image.src} className="project-image" src={image.src} alt={image.alt} />
        ))}
      </div>
      <span className="project-image-count" aria-hidden="true">
        {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  );
}
