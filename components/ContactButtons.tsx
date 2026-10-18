import { siGithub } from "simple-icons";
import { portfolio } from "@/data/portfolio";

const linkedInPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.001-4.124 2.062 2.062 0 0 1 .001 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function BrandIcon({ path, label }: { path: string; label: string }) {
  return (
    <svg aria-hidden="true" className="contact-button-icon" viewBox="0 0 24 24" focusable="false">
      <path d={path} />
      <title>{label}</title>
    </svg>
  );
}

export function ContactButtons({ variant = "contact" }: { variant?: "contact" | "footer" }) {
  return (
    <div className={`contact-buttons contact-buttons--${variant}`}>
      <a
        aria-label={`Email ${portfolio.contact.email}`}
        className="contact-icon-button"
        data-tooltip="Email"
        href={`mailto:${portfolio.contact.email}`}
      >
        <svg aria-hidden="true" className="contact-button-icon contact-button-icon--outline" viewBox="0 0 24 24" fill="none" focusable="false">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      </a>
      <a
        aria-label="GitHub profile"
        className="contact-icon-button"
        data-tooltip="GitHub"
        href={portfolio.contact.github}
        rel="noreferrer"
        target="_blank"
      >
        <BrandIcon path={siGithub.path} label="GitHub" />
      </a>
      <a
        aria-label="LinkedIn profile"
        className="contact-icon-button"
        data-tooltip="LinkedIn"
        href={portfolio.contact.linkedin}
        rel="noreferrer"
        target="_blank"
      >
        <BrandIcon path={linkedInPath} label="LinkedIn" />
      </a>
    </div>
  );
}
