import site from "../lib.json";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return <header className="site-header"><div className="header-inner">
    <a className="brand" href={site.header.homeHref} aria-label={`${site.brand.name} home`}><BrandMark /><span className="brand-copy"><span className="brand-name">{site.brand.name}</span><span className="brand-sub">{site.brand.legalName}</span></span></a>
    <nav aria-label="Main navigation">{site.header.navigation.map((item) => <a className={item.style === "primary" ? "contact-link" : undefined} href={item.href} key={item.href}>{item.label}</a>)}</nav>
  </div></header>;
}
