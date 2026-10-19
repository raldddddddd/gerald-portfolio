"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function MessageForm() {
  const [messageLength, setMessageLength] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = `From: ${name}\nReply to: ${email}\n\n${message}`;
    const mailto = `mailto:${portfolio.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <div className="message-form-fields">
        <label className="form-field">
          <span>Name <i aria-hidden="true">*</i></span>
          <input autoComplete="name" name="name" placeholder="Your name" required />
        </label>
        <label className="form-field">
          <span>Email <i aria-hidden="true">*</i></span>
          <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
        </label>
        <label className="form-field form-field-subject">
          <span>Subject <i aria-hidden="true">*</i></span>
          <input autoComplete="off" name="subject" placeholder="Enter a subject" required />
        </label>
        <label className="form-field form-field-message">
          <span>Message <i aria-hidden="true">*</i></span>
          <textarea aria-describedby="message-count" maxLength={4000} name="message" onChange={(event) => setMessageLength(event.currentTarget.value.length)} placeholder="What would you like to talk about?" required rows={5} />
          <span className="message-counter" id="message-count" aria-live="polite">{messageLength}/4000</span>
        </label>
      </div>
      <p className="form-privacy-note">Fields marked * are required. Your details are used only to reply to you.</p>
      <button className="message-submit" type="submit">Send message <span aria-hidden="true">↗</span></button>
    </form>
  );
}
