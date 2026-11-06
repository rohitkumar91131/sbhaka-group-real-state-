import type { FooterColumn as FooterColumnData } from "../lib/site-data";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return <section className="footer-col"><h3>{column.heading}</h3>{column.links.map((link) => {
    const external = "external" in link && link.external;
    const hasWhatsapp = "whatsappHref" in link && typeof link.whatsappHref === "string";
    if (hasWhatsapp) {
      const whatsappHref = link.whatsappHref;
      const whatsappLabel = "whatsappLabel" in link ? link.whatsappLabel : link.label;
      const whatsappExternal = "whatsappExternal" in link && link.whatsappExternal;
      return <div className="footer-phone-row" key={link.href}>
        <a className="footer-phone-link" href={link.href}>{link.label}</a>
        <a className="whatsapp-link" href={whatsappHref} aria-label={whatsappLabel} title={whatsappLabel} target={whatsappExternal ? "_blank" : undefined} rel={whatsappExternal ? "noopener noreferrer" : undefined}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a8.2 8.2 0 0 1-12.1 7.2L4 20l1.2-3.6A8.2 8.2 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8.7 8.2c.3 2.9 3.1 5.8 6 6.1l1-1.1-2.1-1-1 .8a5.7 5.7 0 0 1-2.6-2.6l.8-1-1-2.1-1.1.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>;
    }
    return <a key={link.href} href={link.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{link.label}</a>;
  })}</section>;
}
