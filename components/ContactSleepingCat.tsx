"use client";

import { useEffect, useRef, useState } from "react";

const STRETCH_DURATION_MS = 900;

export function ContactSleepingCat() {
  const [isStretching, setIsStretching] = useState(false);
  const [reactionKey, setReactionKey] = useState(0);
  const stretchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (stretchTimeout.current) clearTimeout(stretchTimeout.current);
  }, []);

  const wakeCat = () => {
    if (stretchTimeout.current) clearTimeout(stretchTimeout.current);
    setReactionKey((key) => key + 1);
    setIsStretching(true);
    stretchTimeout.current = setTimeout(() => setIsStretching(false), STRETCH_DURATION_MS);
  };

  return (
    <button
      className="contact-sleeping-cat-button"
      type="button"
      aria-label="Wake the sleeping cat"
      onClick={wakeCat}
    >
      <svg className="contact-sleeping-cat" viewBox="0 0 160 92" aria-hidden="true" focusable="false">
        <ellipse className="contact-sleeping-cat-shadow" cx="80" cy="84" rx="65" ry="4" />
        <g key={reactionKey} className={`contact-sleeping-cat-figure${isStretching ? " is-stretching" : ""}`}>
          <path
            className="contact-sleeping-cat-body"
            d="M32 67c-7-11-4-26 7-34 10-8 22-10 34-5 11-12 27-17 43-12 17 5 27 18 27 34 0 17-12 29-30 29H61c-14 0-24-4-29-12Z"
          />
          <path
            className="contact-sleeping-cat-tail"
            d="M126 61c17-3 22-15 16-24-4-6-12-7-17-2"
          />
          <path
            className="contact-sleeping-cat-head"
            d="M19 54c-2-11 1-21 9-27l-1-16 15 10c9-3 18-3 27 1l15-10-2 18c7 7 9 16 6 25-4 13-18 20-35 20-18 0-31-7-34-21Z"
          />
          <path className="contact-sleeping-cat-ear" d="m33 24-2-7 8 6m34 0 7-6-1 10" />
          <path className="contact-sleeping-cat-eyes-closed" d="M38 51q5 5 10 0m17 0q5 5 10 0" />
          <g className="contact-sleeping-cat-eyes-open">
            <ellipse cx="43" cy="51" rx="2.2" ry="3.2" />
            <ellipse cx="70" cy="51" rx="2.2" ry="3.2" />
          </g>
          <path className="contact-sleeping-cat-face" d="m54 60 4 3 4-3m-4 3v3" />
          <path className="contact-sleeping-cat-fur" d="M96 32q8-5 16-3m-9 9q8-4 15-2M36 66q7 3 13 1" />
          <path className="contact-sleeping-cat-paw" d="M82 72q5-4 11-2m4 2q5-3 10-1" />
        </g>
      </svg>
    </button>
  );
}
