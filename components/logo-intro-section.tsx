import site from "../lib.json";
import { MainLogoMark } from "./main-logo-mark";
import "./preloaders.css";

export function LogoIntroSection() {
  return <section className="logo-intro" id={site.hero.id} aria-label={`${site.brand.name} introduction`}>
    <div className="logo-intro-stage">
      <div className="logo-intro-mark-wrap">
        <MainLogoMark className="mark-svg main-mark logo-intro-mark" backgroundFill="var(--paper)" />
      </div>
      <div className="logo-intro-wordmark">
        <p className="logo-intro-brand">{site.brand.name}</p>
        <p className="logo-intro-legal">{site.brand.legalName}</p>
        <p className="logo-intro-tagline">{site.brand.tagline}</p>
      </div>
    </div>
    <a className="logo-intro-scroll" href="#home-hero" aria-label="Scroll to explore the homepage">
      <span>Scroll</span><i aria-hidden="true" />
    </a>
  </section>;
}
