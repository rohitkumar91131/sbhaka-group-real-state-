import { AboutSection } from "../components/about-section";
import { DivisionsSection } from "../components/divisions-section";
import { HeroSection } from "../components/hero-section";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function Home() {
  return <><SiteHeader /><main><HeroSection /><AboutSection /><DivisionsSection /></main><SiteFooter /></>;
}
