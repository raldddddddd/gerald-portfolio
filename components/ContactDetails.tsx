import { portfolio } from "@/data/portfolio";
import { LocalTime } from "@/components/LocalTime";

export function ContactDetails() {
  return (
    <div className="contact-details">
      <section className="contact-detail-group" aria-labelledby="contact-location-label">
        <h4 className="contact-detail-label" id="contact-location-label">Based in</h4>
        <p className="contact-detail-value">Pampanga, Philippines</p>
        <LocalTime />
      </section>

      <section className="contact-detail-group" aria-labelledby="contact-elsewhere-label">
        <h4 className="contact-detail-label" id="contact-elsewhere-label">Elsewhere</h4>
        <a className="contact-detail-value" href={portfolio.contact.github} rel="noreferrer" target="_blank">GitHub <span>↗</span></a>
        <a className="contact-detail-value" href={portfolio.contact.linkedin} rel="noreferrer" target="_blank">LinkedIn <span>↗</span></a>
      </section>
    </div>
  );
}
