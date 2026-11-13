import { AboutSection } from "../components/about-section";
import { DivisionsSection } from "../components/divisions-section";
import { HeroSection } from "../components/hero-section";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ContactSection } from "../components/contact-section";
import { LogoIntroSection } from "../components/logo-intro-section";

export default function Home() {
  return <><SiteHeader /><main><LogoIntroSection /><HeroSection /><AboutSection /><DivisionsSection /><ContactSection /></main><SiteFooter /></>;
}
