import { portfolio } from "@/data/portfolio";

export function EmailActions() {
  return (
    <div className="direct-contact">
      <p className="direct-contact-label">Write directly</p>
      <a className="direct-contact-address" href={`mailto:${portfolio.contact.email}`}>
        {portfolio.contact.email}
      </a>
      <p className="direct-contact-message">Have an opportunity, collaboration idea, or quick question? I’d be glad to hear from you.</p>
      <a className="email-action-link" href={`mailto:${portfolio.contact.email}`} aria-label={`Email ${portfolio.contact.email}`}>
        Email me <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
