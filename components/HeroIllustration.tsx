export function HeroIllustration() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="var(--accent)" fillOpacity=".42" />
          </pattern>
          <linearGradient id="hero-blue" x1="120" y1="80" x2="390" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent-bright)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <circle cx="252" cy="252" r="205" fill="var(--art-disc)" />
        <circle cx="252" cy="252" r="189" stroke="var(--art-line)" strokeDasharray="2 9" />
        <g className="orbit">
          <ellipse cx="252" cy="252" rx="178" ry="82" stroke="var(--accent)" strokeOpacity=".38" strokeWidth="1.5" />
          <circle cx="78" cy="216" r="6" fill="#E9A94F" />
        </g>
        <path d="M131 341c-28-29-39-69-30-107 10-42 43-74 84-87 39-12 78-3 109 17 35 22 57 58 58 99 1 45-24 86-64 108-52 28-117 18-157-30Z" fill="url(#hero-blue)" />
        <path d="M177 250c18-33 47-49 82-46 38 3 67 29 76 64" stroke="white" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round" />
        <path d="M154 308c25 25 64 37 100 29 34-7 63-29 78-60" stroke="white" strokeOpacity=".48" strokeWidth="2" strokeLinecap="round" />
        <circle cx="252" cy="252" r="31" fill="var(--paper)" />
        <circle cx="252" cy="252" r="13" fill="#E9A94F" />
        <rect x="305" y="101" width="94" height="94" rx="8" fill="url(#hero-dots)" />
        <g className="float">
          <rect x="62" y="148" width="86" height="86" rx="26" transform="rotate(-12 62 148)" fill="#E9A94F" />
          <path d="m93 180 17-3 3 17m-3-17-27 32" stroke="#20211F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="float-delayed">
          <rect x="336" y="315" width="91" height="91" rx="45.5" fill="var(--surface)" stroke="var(--art-line)" />
          <g transform="rotate(12 381.5 361.5)">
            <path d="M365 361h33m-16-16v33" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
        <circle cx="157" cy="388" r="5" fill="var(--accent)" />
        <circle cx="392" cy="244" r="4" fill="#E9A94F" />
      </svg>
    </div>
  );
}
