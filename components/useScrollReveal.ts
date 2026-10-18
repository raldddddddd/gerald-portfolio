"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export function useScrollReveal(index: number) {
  const revealRef = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const setRevealRef = useCallback((element: HTMLElement | null) => {
    revealRef.current = element;
  }, []);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    setIsReady(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -36px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return {
    ref: setRevealRef,
    className: `scroll-reveal-card${isReady && !isVisible ? " is-pending" : " is-visible"}`,
    style: { "--scroll-reveal-delay": `${Math.min(index, 3) * 55}ms` } as CSSProperties,
  };
}
