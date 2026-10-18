"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type CatId = "top" | "hammock" | "cubby" | "floor";

const catActions: Record<CatId, { label: string; reaction: string; message: string }> = {
  top: { label: "Sleeping cat on the top perch. Activate to wake it for a stretch.", reaction: "stretch", message: "The top cat wakes up and stretches." },
  hammock: { label: "Cat lounging in the hammock. Activate to rock the hammock.", reaction: "sway", message: "The hammock cat sways in its bed." },
  cubby: { label: "Cat peeking from the cubby. Activate to make it peek out.", reaction: "peek", message: "The cubby cat peeks out to say hello." },
  floor: { label: "Cat sitting by the base. Activate to make it flick its tail.", reaction: "tail", message: "The floor cat flicks its tail." },
};

export function CatTreeHero() {
  const [activeCat, setActiveCat] = useState<CatId | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const actionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (actionTimeout.current) clearTimeout(actionTimeout.current);
  }, []);

  const reactivate = (cat: CatId) => {
    if (actionTimeout.current) clearTimeout(actionTimeout.current);
    setActiveCat(cat);
    setAnnouncement(catActions[cat].message);
    actionTimeout.current = setTimeout(() => setActiveCat(null), 1050);
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, cat: CatId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      reactivate(cat);
    }
  };

  const catControl = (cat: CatId, className: string, children: React.ReactNode) => (
    <g
      aria-label={catActions[cat].label}
      className={`cat-character ${className}${activeCat === cat ? ` cat-react-${catActions[cat].reaction}` : ""}`}
      onClick={() => reactivate(cat)}
      onKeyDown={(event) => handleKeyDown(event, cat)}
      role="button"
      tabIndex={0}
    >
      {children}
    </g>
  );

  return (
    <div className="hero-art cat-tree-art">
      <svg aria-label="A wooden cat tree with four interactive cats" className="cat-tree-svg" role="group" viewBox="0 0 520 560" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="catwood" x1="120" x2="420" y1="140" y2="470" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F6CF78" />
            <stop offset="1" stopColor="#D99449" />
          </linearGradient>
          <pattern id="cat-sisal" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 3h12M0 9h12" stroke="#9C7048" strokeOpacity=".42" strokeWidth="1.5" />
          </pattern>
          <clipPath id="cat-cubby-window">
            <path d="M290 418v-42a48 48 0 0 1 96 0v42Z" />
          </clipPath>
        </defs>

        <circle cx="260" cy="286" r="236" fill="var(--art-disc)" />
        <circle cx="260" cy="286" r="218" fill="none" stroke="var(--art-line)" strokeDasharray="2 10" />

        {/* The multi-level frame and scratch posts */}
        <g stroke="#594638" strokeLinejoin="round" strokeWidth="5">
          <rect x="133" y="482" width="317" height="31" rx="15.5" fill="url(#catwood)" />
          <rect x="186" y="221" width="40" height="265" rx="9" fill="url(#catwood)" />
          <rect x="186" y="221" width="40" height="265" rx="9" fill="url(#cat-sisal)" stroke="none" />
          <rect x="366" y="203" width="40" height="284" rx="9" fill="url(#catwood)" />
          <rect x="366" y="203" width="40" height="284" rx="9" fill="url(#cat-sisal)" stroke="none" />
          <rect x="271" y="117" width="42" height="110" rx="9" fill="url(#catwood)" />
          <rect x="271" y="117" width="42" height="110" rx="9" fill="url(#cat-sisal)" stroke="none" />
          <rect x="124" y="207" width="309" height="20" rx="9" fill="url(#catwood)" />
          <rect x="198" y="105" width="185" height="20" rx="9" fill="url(#catwood)" />
          <rect x="236" y="420" width="206" height="20" rx="9" fill="url(#catwood)" />
          <path d="M205 237h-42v48m42-48v47" fill="none" />
        </g>

        {/* Hammock and cubby */}
        <path d="M24 323h190l-14 63c-6 27-31 45-77 45s-73-18-82-45l-17-63Z" fill="#F3BD68" stroke="#594638" strokeLinejoin="round" strokeWidth="5" />
        <path d="M26 324c34 13 144 13 188 0" fill="none" stroke="#594638" strokeLinecap="round" strokeWidth="7" />
        <path d="M46 342c28 6 44 6 62 3m48 0c18 3 34 3 49-1" fill="none" stroke="#C17D3E" strokeLinecap="round" strokeWidth="3" />
        <path d="M250 302h190v119H250z" fill="url(#catwood)" stroke="#594638" strokeLinejoin="round" strokeWidth="5" />
        <path d="M283 420v-43a51 51 0 0 1 102 0v43Z" fill="#55443A" stroke="#594638" strokeLinejoin="round" strokeWidth="4" />
        <path d="M267 318h155v28H267z" fill="#F8D68F" opacity=".72" />

        {/* Hanging ball */}
        <path d="M358 125v52" stroke="#594638" strokeLinecap="round" strokeWidth="3" />
        <path d="M358 125v52" stroke="#F8E3B5" strokeDasharray="2 4" strokeWidth="1" />
        <circle cx="358" cy="195" r="19" fill="#F1B956" stroke="#594638" strokeWidth="4" />
        <path d="M351 190c4-7 13-8 17-3" fill="none" stroke="#FFF0C8" strokeLinecap="round" strokeWidth="3" />

        {/* Cat on the top perch: sleeping, with gentle breathing */}
        {catControl("top", "cat-top cat-sleeping", <>
          <path d="M221 99c-13-8-21-21-14-31 7-10 20-12 31-7 7-18 25-25 42-19 12 4 20 14 21 27 16-6 34 3 36 19 2 12-8 21-22 23h-71c-10 0-17-3-23-12Z" fill="#E8E2D8" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="M237 70 231 47l24 14m43 1 18-20 5 31" fill="#E8E2D8" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m238 58 5 9 7-2m57-5-6 10-7-2" fill="#DCA1A0" />
          <path d="M221 94c-15 6-19 0-22-8" fill="none" stroke="#47392F" strokeLinecap="round" strokeWidth="5" />
          <path d="M280 84q5 4 10 0m14 0q5 4 10 0m-16 9q4 3 8 0" fill="none" stroke="#47392F" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M296 99c10 5 17 5 25 3" fill="none" stroke="#C58E68" strokeLinecap="round" strokeWidth="3" />
          <g className="purr-lines"><path d="M324 73q8-7 0-14m7 21q10-9 0-18" /></g>
        </>)}

        {/* Hammock cat: soft gray tabby who blinks and purrs */}
        {catControl("hammock", "cat-hammock cat-blinks", <>
          <path d="M54 319c12-18 43-20 67-10 19 8 34 21 48 20 11 0 18-9 27-8 10 2 12 14 3 22-13 11-40 10-66 5-27-5-60 0-78-8-9-4-8-13-1-21Z" fill="#A8ADB0" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="M112 305c17 7 25 17 28 31m-12-36c17 7 27 18 31 35" fill="none" stroke="#777F82" strokeLinecap="round" strokeWidth="5" />
          <path d="M52 322c-13-6-15-22-10-35l4-15 14 11c10-8 23-9 34-2 16 10 20 31 11 44-11 13-39 11-53-3Z" fill="#B8BEC0" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m46 283 1-18 17 14m23 0 12-16 4 24" fill="#B8BEC0" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m51 279 5 7 6-2m30-4-6 8-7-2" fill="#DBA2A1" />
          <g className="cat-eyes-open"><ellipse cx="62" cy="299" rx="2.4" ry="4" fill="#47392F" /><ellipse cx="84" cy="299" rx="2.4" ry="4" fill="#47392F" /></g>
          <g className="cat-eyes-closed"><path d="m55 300 8 1m13-1 8 1" /></g>
          <path d="m69 307 4 3 4-3m-4 3v4" fill="none" stroke="#47392F" strokeLinecap="round" strokeWidth="2" />
          <g className="purr-lines"><path d="M100 290q8-6 1-13m7 20q10-8 2-17" /></g>
        </>)}

        {/* Cat peeking from the cubby, paws on the doorway sill */}
        {catControl("cubby", "cat-cubby cat-blinks", <g clipPath="url(#cat-cubby-window)">
          <path d="M300 413c-3-28 3-59 19-69 8-5 18-1 25 7 11-12 24-13 34-4 16 14 18 44 15 69Z" fill="#F4F0E8" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m318 357-2-22 21 13m41-2 20-16 1 29" fill="#F4F0E8" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m322 348 5 8 7-2m52-5-7 9-7-2" fill="#DCA1A0" />
          <g className="cat-eyes-open"><ellipse cx="333" cy="371" rx="2.8" ry="4.5" fill="#47392F" /><ellipse cx="373" cy="371" rx="2.8" ry="4.5" fill="#47392F" /></g>
          <g className="cat-eyes-closed"><path d="m325 372 9 1m35-1 9 1" /></g>
          <path d="m347 382 5 4 5-4m-5 4v5m-8 4q8 5 16 0" fill="none" stroke="#47392F" strokeLinecap="round" strokeWidth="2.5" />
          <ellipse cx="328" cy="415" rx="16" ry="8" fill="#F4F0E8" stroke="#47392F" strokeWidth="3" />
          <ellipse cx="374" cy="415" rx="16" ry="8" fill="#F4F0E8" stroke="#47392F" strokeWidth="3" />
        </g>)}

        {/* Floor cat with a tail that flicks when clicked */}
        {catControl("floor", "cat-floor cat-blinks", <>
          <path d="M376 474c1-19 17-31 40-31 21 0 37 12 40 31l-4 11h-73Z" fill="#D69A59" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <g className="cat-tail"><path d="M447 459c18-3 19-22 7-27-9-4-15 4-11 10" fill="none" stroke="#47392F" strokeLinecap="round" strokeWidth="7" /><path d="M447 459c18-3 19-22 7-27-9-4-15 4-11 10" fill="none" stroke="#D69A59" strokeLinecap="round" strokeWidth="4" /></g>
          <path d="M390 454c-4-15 5-27 20-30l-1-17 18 10c11-4 24 2 29 13 6 13-1 27-13 32-19 8-46 6-53-8Z" fill="#D69A59" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m395 423 2-18 17 12m22-2 14-16 4 24" fill="#D69A59" stroke="#47392F" strokeLinejoin="round" strokeWidth="4" />
          <path d="m400 419 6 7 6-3m32-4-7 8-6-3" fill="#DCA1A0" />
          <g className="cat-eyes-open"><ellipse cx="409" cy="434" rx="2.5" ry="4.2" fill="#47392F" /><ellipse cx="432" cy="434" rx="2.5" ry="4.2" fill="#47392F" /></g>
          <g className="cat-eyes-closed"><path d="m402 435 9 1m16-1 9 1" /></g>
          <path d="m417 442 4 3 4-3m-4 3v4" fill="none" stroke="#47392F" strokeLinecap="round" strokeWidth="2.4" />
        </>)}

        <path d="M175 206h210" stroke="#FFF1D4" strokeLinecap="round" strokeOpacity=".72" strokeWidth="4" />
        <path d="M201 104h179" stroke="#FFF1D4" strokeLinecap="round" strokeOpacity=".72" strokeWidth="3" />
      </svg>
      <span aria-live="polite" className="sr-only" role="status">{announcement}</span>
    </div>
  );
}
