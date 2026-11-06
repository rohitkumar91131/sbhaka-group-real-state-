"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import site from "../lib.json";

type NavigationItem = (typeof site.header.navigation)[number];

export function ResponsiveNavigation({ items }: { items: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  const closeMenu = useCallback(() => {
    const nav = navRef.current;
    if (!nav || !isOpen) return;

    closeTweenRef.current?.kill();
    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile || prefersReducedMotion) {
      setIsOpen(false);
      return;
    }

    closeTweenRef.current = gsap.to(nav, {
      height: 0,
      autoAlpha: 0,
      y: -8,
      duration: 0.24,
      ease: "power2.in",
      onComplete: () => setIsOpen(false)
    });
  }, [isOpen]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const media = gsap.matchMedia();
    media.add({
      mobile: "(max-width: 860px)",
      reducedMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      if (!context.conditions?.mobile) {
        gsap.set(nav, { clearProps: "all" });
        return;
      }

      if (!isOpen) {
        gsap.set(nav, { display: "none", height: 0, autoAlpha: 0, y: 0 });
        return;
      }

      gsap.set(nav, { display: "flex", overflow: "hidden" });
      if (context.conditions?.reducedMotion) {
        gsap.set(nav, { height: "auto", autoAlpha: 1, y: 0 });
        return;
      }

      const links = nav.querySelectorAll("a");
      const timeline = gsap.timeline();
      timeline.fromTo(nav, { height: 0, autoAlpha: 0, y: -10 }, {
        height: "auto", autoAlpha: 1, y: 0, duration: 0.34, ease: "power3.out"
      });
      timeline.fromTo(links, { autoAlpha: 0, y: -7 }, {
        autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.045, ease: "power2.out"
      }, "-=0.16");
    });

    return () => media.revert();
  }, [isOpen]);

  useEffect(() => {
    return () => { closeTweenRef.current?.kill(); };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  return <>
    <button
      ref={toggleRef}
      className="nav-toggle"
      type="button"
      aria-controls={site.header.navigationId}
      aria-expanded={isOpen}
      aria-label={isOpen ? site.header.closeMenuLabel : site.header.openMenuLabel}
      onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
    >
      <span className="nav-toggle-line line-one" aria-hidden="true" />
      <span className="nav-toggle-line line-two" aria-hidden="true" />
      <span className="nav-toggle-line line-three" aria-hidden="true" />
    </button>
    <nav ref={navRef} className="site-nav" id={site.header.navigationId} aria-label={site.navigationText.mainAriaLabel}>
      {items.map((item) => <a className={item.style === "primary" ? "contact-link" : undefined} href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>)}
    </nav>
  </>;
}
