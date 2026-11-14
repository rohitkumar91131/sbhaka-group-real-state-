"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import type { FooterColumn as FooterColumnData } from "../lib/site-data";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const panelId = `footer-links-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 520px)");
    const syncBreakpoint = () => {
      animationRef.current?.kill();
      animationRef.current = null;
      if (openFrameRef.current !== null) {
        cancelAnimationFrame(openFrameRef.current);
        openFrameRef.current = null;
      }
      setIsMobile(mobile.matches);
      setIsOpen(!mobile.matches);
      setIsClosing(false);
      if (panelRef.current) {
        gsap.killTweensOf(panelRef.current);
        gsap.set(panelRef.current, { clearProps: "all" });
      }
      if (verticalLineRef.current) {
        gsap.killTweensOf(verticalLineRef.current);
        gsap.set(verticalLineRef.current, { scaleY: mobile.matches ? 1 : 0, transformOrigin: "50% 50%" });
      }
    };

    syncBreakpoint();
    mobile.addEventListener("change", syncBreakpoint);
    return () => {
      mobile.removeEventListener("change", syncBreakpoint);
      animationRef.current?.kill();
      if (openFrameRef.current !== null) cancelAnimationFrame(openFrameRef.current);
      if (panelRef.current) gsap.killTweensOf(panelRef.current);
      if (verticalLineRef.current) gsap.killTweensOf(verticalLineRef.current);
    };
  }, []);

  function toggleColumn() {
    if (!isMobile) return;
    const panel = panelRef.current;
    const verticalLine = verticalLineRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animationRef.current?.kill();
    animationRef.current = null;
    if (openFrameRef.current !== null) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
    if (panel) gsap.killTweensOf(panel);
    if (verticalLine) gsap.killTweensOf(verticalLine);

    if (isOpen) {
      setIsOpen(false);
      setIsClosing(true);
      if (reduceMotion || !panel) {
        if (panel) gsap.set(panel, { clearProps: "all" });
        setIsClosing(false);
      } else {
        const timeline = gsap.timeline({ onComplete: () => setIsClosing(false) });
        animationRef.current = timeline;
        timeline.to(panel, {
          height: 0,
          autoAlpha: 0,
          y: -6,
          duration: 0.24,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { clearProps: "height,opacity,transform" }),
        }, 0);
        if (verticalLine) timeline.to(verticalLine, { scaleY: 1, duration: 0.22, ease: "power2.inOut" }, 0);
      }
      if (reduceMotion && verticalLine) gsap.set(verticalLine, { scaleY: 1 });
      return;
    }

    setIsOpen(true);
    setIsClosing(false);
    if (!verticalLine) return;
    if (reduceMotion) {
      if (panel) gsap.set(panel, { clearProps: "all" });
      gsap.set(verticalLine, { scaleY: 0 });
      return;
    }

    gsap.to(verticalLine, { scaleY: 0, duration: 0.24, ease: "power2.inOut" });
    if (panel) {
      openFrameRef.current = requestAnimationFrame(() => {
        openFrameRef.current = null;
        animationRef.current = gsap.timeline().fromTo(panel, { height: 0, autoAlpha: 0, y: -6 }, {
          height: "auto",
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          ease: "power2.out",
          onComplete: () => gsap.set(panel, { clearProps: "height,opacity,transform" }),
        });
      });
    }
  }

  return <section className={`footer-col${isOpen ? " is-open" : ""}${isClosing ? " is-closing" : ""}`}>
    <h3 className="footer-col-heading">{column.heading}</h3>
    <button
      className="footer-col-toggle"
      type="button"
      aria-controls={panelId}
      aria-expanded={isMobile && isOpen}
      onClick={toggleColumn}
    >
      <span>{column.heading}</span>
      <span className="footer-col-toggle-icon" aria-hidden="true">
        <span className="footer-col-toggle-horizontal" />
        <span className="footer-col-toggle-vertical" ref={verticalLineRef} />
      </span>
    </button>
    <div
      className="footer-col-links"
      id={panelId}
      ref={panelRef}
      aria-hidden={isMobile && !isOpen}
    >
      {column.links.map((link) => {
        const external = "external" in link && link.external;
        const whatsapp = "style" in link && link.style === "whatsapp";
        return <a
          className={whatsapp ? "whatsapp-link" : undefined}
          key={link.href}
          href={link.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          tabIndex={isMobile && !isOpen ? -1 : undefined}
        >{link.label}</a>;
      })}
    </div>
  </section>;
}
