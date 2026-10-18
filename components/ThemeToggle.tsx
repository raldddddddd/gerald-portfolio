"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PullMotion = { extension: number; angle: number };
type PullSample = { y: number; x: number; time: number };

const STORAGE_KEY = "gerald-portfolio-theme";
const MAX_EXTENSION = 48;

function resistedExtension(distance: number) {
  const positiveDistance = Math.max(0, distance);
  return Math.min(MAX_EXTENSION, 58 * (1 - Math.exp(-positiveDistance / 36)));
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [motion, setMotion] = useState<PullMotion>({ extension: 0, angle: 0 });
  const [isPulling, setIsPulling] = useState(false);
  const [isRecoiling, setIsRecoiling] = useState(false);
  const dragStart = useRef<PullSample | null>(null);
  const previousSample = useRef<PullSample | null>(null);
  const dragVelocity = useRef({ x: 0, y: 0 });
  const distanceRef = useRef(0);
  const extensionRef = useRef(0);
  const angleRef = useRef(0);
  const suppressClick = useRef(false);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Theme still works when browser storage is unavailable.
      }
      return next;
    });
  }, []);

  const recoil = useCallback((extension: number, velocity: number, angle: number, angularVelocity: number) => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setMotion({ extension: 0, angle: 0 });
      setIsRecoiling(false);
      return;
    }

    setIsRecoiling(true);
    let position = extension;
    let speed = velocity;
    let rotation = angle;
    let spin = angularVelocity;
    let lastTime = performance.now();
    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.02);
      lastTime = time;
      // A lightly damped spring gives the weighted tassel several diminishing bounces.
      speed += (-250 * position - 7 * speed) * dt;
      position += speed * dt;
      spin += (-88 * rotation - 4.5 * spin + speed * 0.025) * dt;
      rotation += spin * dt;
      setMotion({ extension: position, angle: rotation });
      if (Math.abs(position) < 0.2 && Math.abs(speed) < 3 && Math.abs(rotation) < 0.35 && Math.abs(spin) < 4) {
        animationFrame.current = null;
        setMotion({ extension: 0, angle: 0 });
        setIsRecoiling(false);
        return;
      }
      animationFrame.current = requestAnimationFrame(tick);
    };
    animationFrame.current = requestAnimationFrame(tick);
  }, []);

  const presetPull = useCallback(() => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    toggleTheme();
    recoil(28, -185, -8, 0);
  }, [recoil, toggleTheme]);

  const onPointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse" || dragStart.current) return;
    // A small impulse makes the tassel respond as the pointer brushes past it.
    // Negative SVG rotation moves the lower end to the right.
    const impulse = event.clientX < event.currentTarget.getBoundingClientRect().left + 24 ? -105 : 105;
    recoil(motion.extension, 0, motion.angle, impulse);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    suppressClick.current = false;
    const sample = { x: event.clientX, y: event.clientY, time: performance.now() };
    dragStart.current = sample;
    previousSample.current = sample;
    dragVelocity.current = { x: 0, y: 0 };
    distanceRef.current = 0;
    extensionRef.current = 0;
    angleRef.current = 0;
    setIsRecoiling(false);
    setIsPulling(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current) return;
    const sample = { x: event.clientX, y: event.clientY, time: performance.now() };
    const previous = previousSample.current ?? dragStart.current;
    const elapsed = Math.max(1, sample.time - previous.time);
    dragVelocity.current = {
      x: (sample.x - previous.x) / elapsed * 1000,
      y: (sample.y - previous.y) / elapsed * 1000,
    };
    previousSample.current = sample;
    const deltaX = sample.x - dragStart.current.x;
    const deltaY = sample.y - dragStart.current.y;
    const extension = resistedExtension(deltaY);
    // SVG's positive rotation swings the lower end left; invert it to track the pointer.
    const angle = Math.max(-18, Math.min(18, -deltaX * 0.32));
    distanceRef.current = Math.hypot(deltaX, deltaY);
    extensionRef.current = extension;
    angleRef.current = angle;
    setMotion({ extension, angle });
  };

  const finishPointer = (event: React.PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const start = dragStart.current;
    if (!start) return;
    const didMove = !cancelled && distanceRef.current >= 8;
    const wasPulled = didMove && extensionRef.current >= 24;
    const velocity = dragVelocity.current;
    const extension = extensionRef.current;
    dragStart.current = null;
    previousSample.current = null;
    distanceRef.current = 0;
    extensionRef.current = 0;
    setIsPulling(false);
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already have been released by the browser.
    }
    if (didMove) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
    if (wasPulled) {
      toggleTheme();
      recoil(extension, -Math.min(velocity.y * 0.22, 260), angleRef.current, -velocity.x * 0.012);
    } else {
      recoil(extension, -velocity.y * 0.12, angleRef.current, -velocity.x * 0.008);
    }
  };

  return (
    <button
      aria-label={`${theme === "light" ? "Light" : "Dark"} mode. Pull to switch to ${theme === "light" ? "dark" : "light"} mode.`}
      aria-pressed={theme === "dark"}
      className={`theme-toggle${isPulling ? " is-pulling" : ""}${isRecoiling ? " is-recoiling" : ""}`}
      onClick={presetPull}
      onPointerCancel={(event) => finishPointer(event, true)}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => finishPointer(event)}
      type="button"
    >
      <svg aria-hidden="true" viewBox="0 0 48 196" fill="none">
        <rect x="11" y="1" width="26" height="9" rx="4.5" fill="var(--surface)" stroke="var(--control-border)" strokeWidth="1.5" />
        <path d="M18 5.5h12" stroke="var(--muted)" strokeWidth="1" strokeLinecap="round" />
        <g transform={`rotate(${motion.angle} 24 10)`}>
          <path d={`M24 10v${62 + motion.extension}`} className="theme-cord-rope" />
          <path d={`M24 10v${62 + motion.extension}`} className="theme-cord-braid" />
          <g transform={`translate(0 ${motion.extension})`} className="theme-cord-knob">
            <path d="M24 70v3" className="theme-cord-line" />
            <path d="M16 72h16v4c0 3-3 5-8 5s-8-2-8-5v-4Z" fill="var(--accent-bright)" />
            <path d="M17 77c3 1.1 11 1.1 14 0" stroke="var(--paper)" strokeOpacity=".65" strokeWidth="1.2" strokeLinecap="round" />
            <g transform="translate(3.6 0) scale(.85 1)">
              <path
                d="M15 80 C15 86 8.2 91 6.6 99 C4.4 111.5 9.5 122.5 17 126.2 C18.5 127 19.5 127.2 21 127.2 H27 C28.5 127.2 29.5 127 31 126.2 C38.5 122.5 43.6 111.5 41.4 99 C39.8 91 33 86 33 80 C28 81.5 20 81.5 15 80Z"
                fill="var(--accent)"
              />
              <path
                d="M15 91c-3 7-3 14 0 20m5-27c1 2 1.5 3.5 1.5 5"
                stroke="var(--paper)"
                strokeOpacity=".42"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </svg>
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
