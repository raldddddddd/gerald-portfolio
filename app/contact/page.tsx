import { PageIntro } from "@/components/PageIntro";
import { portfolio } from "@/data/portfolio";

export default function ContactPage() {
  const contacts = [
    { label: "Email", value: portfolio.contact.email, href: portfolio.contact.email ? `mailto:${portfolio.contact.email}` : "" },
    { label: "GitHub", value: portfolio.contact.github, href: portfolio.contact.github },
    { label: "LinkedIn", value: portfolio.contact.linkedin, href: portfolio.contact.linkedin },
  ].filter((contact) => contact.value);

  return (
    <div className="container page-container">
      <PageIntro eyebrow="Say hello" title="Contact" description="For opportunities, collaborations, or a quick conversation, reach out through one of the links below." />
      <section className="contact-panel" aria-label="Contact links">
        {contacts.length ? contacts.map((contact) => <a className="contact-link" href={contact.href} key={contact.label}><span>{contact.label}</span><span>{contact.value} ↗</span></a>) : <p className="muted">Contact links will appear here once added in <code>data/portfolio.ts</code>.</p>}
      </section>
    </div>
  );
}
