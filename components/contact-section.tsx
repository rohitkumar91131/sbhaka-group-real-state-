import site from "../lib.json";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const contact = site.contact;

  return (
    <section className="contact-section" id={contact.id} aria-labelledby="contact-heading">
      <div className="wrap contact-inner">
        <div className="contact-copy">
          <h2 id="contact-heading">{contact.heading}</h2>
          <p>{contact.intro}</p>
        </div>
        <ContactForm contact={contact} divisions={site.divisions.items.map(({ name }) => name)} />
      </div>
    </section>
  );
}
