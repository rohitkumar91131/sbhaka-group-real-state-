import type { FooterColumn as FooterColumnData } from "../lib/site-data";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return <section className="footer-col"><h3>{column.heading}</h3>{column.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</section>;
}
