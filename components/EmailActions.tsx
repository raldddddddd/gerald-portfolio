"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function EmailActions() {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(portfolio.contact.email);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus("Could not copy the address. Use Email me to open your email app.");
    }
  }

  return (
    <div className="email-actions">
      <a className="email-action-link" href={`mailto:${portfolio.contact.email}`} aria-label={`Email ${portfolio.contact.email}`}>
        Email me <span aria-hidden="true">↗</span>
      </a>
      <button className="email-copy-button" onClick={copyEmail} type="button">Copy email</button>
      <p className="email-copy-status" aria-live="polite" role="status">{copyStatus}</p>
    </div>
  );
}
