import type { FooterColumn as FooterColumnData } from "../lib/site-data";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return <section className="footer-col"><h3>{column.heading}</h3>{column.links.map((link) => {
    const external = "external" in link && link.external;
    const whatsapp = "style" in link && link.style === "whatsapp";
    return <a className={whatsapp ? "whatsapp-link" : undefined} key={link.href} href={link.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{link.label}</a>;
  })}</section>;
}
