import type { FooterColumn as FooterColumnData } from "../lib/site-data";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return <section className="footer-col">
    <h3 className="footer-col-heading">{column.heading}</h3>
    <details className="footer-col-disclosure">
      <summary className="footer-col-toggle">
        <span>{column.heading}</span>
        <span className="footer-col-toggle-icon" aria-hidden="true" />
      </summary>
      <div className="footer-col-links">{column.links.map((link) => {
        const external = "external" in link && link.external;
        const whatsapp = "style" in link && link.style === "whatsapp";
        return <a className={whatsapp ? "whatsapp-link" : undefined} key={link.href} href={link.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{link.label}</a>;
      })}</div>
    </details>
  </section>;
}
