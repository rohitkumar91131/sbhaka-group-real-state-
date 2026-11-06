import site from "../lib.json";
import { BrandMark } from "./brand-mark";
import { FooterColumn } from "./footer-column";

export function SiteFooter() {
  return <footer id={site.footer.id}><div className="wrap"><div className="footer-inner"><section className="footer-brand-col"><div className="footer-brand"><BrandMark footer /><span>{site.brand.name}</span></div><p className="tagline">{site.brand.tagline}</p></section>
    {site.footer.columns.map((column) => <FooterColumn key={column.heading} column={column} />)}
  </div><div className="footer-bottom"><span>{site.footer.copyright}</span>{site.footer.location && <span>{site.footer.location}</span>}</div></div></footer>;
}
