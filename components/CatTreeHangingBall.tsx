"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { advanceAngularSpring, angularSpringHasSettled, getHoverSwayImpulse } from "@/components/hoverSway";

export function CatTreeHangingBall({ x, y }: { x: number; y: number }) {
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  const onPointerEnter = useCallback((event: React.PointerEvent<SVGCircleElement>) => {
    if (event.pointerType !== "mouse") return;
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      angleRef.current = 0;
      setAngle(0);
      return;
    }

    let currentAngle = angleRef.current;
    let velocity = getHoverSwayImpulse(event.clientX, event.currentTarget.getBoundingClientRect());
    let lastTime = performance.now();

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.02);
      lastTime = time;
      const next = advanceAngularSpring(currentAngle, velocity, dt);
      currentAngle = next.angle;
      velocity = next.velocity;
      angleRef.current = currentAngle;
      setAngle(currentAngle);

      if (angularSpringHasSettled(currentAngle, velocity)) {
        animationFrame.current = null;
        angleRef.current = 0;
        setAngle(0);
        return;
      }

      animationFrame.current = requestAnimationFrame(tick);
    };

    animationFrame.current = requestAnimationFrame(tick);
  }, []);

  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}>
      <circle
        cx="0"
        cy="52"
        r="28"
        fill="transparent"
        pointerEvents="all"
        onPointerEnter={onPointerEnter}
      />
      <g transform={`rotate(${angle})`}>
        <path d="M0 0v44" className="hero-cat-toy-string" />
        <circle cx="0" cy="52" r="16" className="hero-cat-tree-ball" pointerEvents="none" />
        <circle cx="-5" cy="47" r="3.4" className="hero-cat-tree-ball-highlight" pointerEvents="none" />
      </g>
    </g>
  );
}
