import site from "../lib.json";
import { BrandMark } from "./brand-mark";
import { ResponsiveNavigation } from "./responsive-navigation";

export function SiteHeader() {
  return <header className="site-header"><div className="header-inner">
    <a className="brand" href={site.header.homeHref} aria-label={`${site.brand.name} home`}><BrandMark /><span className="brand-copy"><span className="brand-name">{site.brand.name}</span><span className="brand-sub">{site.brand.legalName}</span></span></a>
    <ResponsiveNavigation items={site.header.navigation} />
  </div></header>;
}
