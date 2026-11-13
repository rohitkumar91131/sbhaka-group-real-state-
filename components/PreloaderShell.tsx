"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./preloaders.css";

export type PreloaderProps = { onComplete?: () => void };

type Props = PreloaderProps & { children: ReactNode; label: string; minimumDuration?: number };

/** Stay over the page until its load and minimum animation time complete, then fade away. */
export function PreloaderShell({ children, label, onComplete, minimumDuration = 0 }: Props) {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const callback = useRef(onComplete);
  useEffect(() => { callback.current = onComplete; }, [onComplete]);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pageLoaded = document.readyState === "complete";
    let minimumElapsed = reducedMotion || minimumDuration <= 0;
    const tryFinish = () => {
      if (pageLoaded && minimumElapsed) setExiting(true);
    };
    const fallbackTimer = window.setTimeout(() => {
      pageLoaded = true;
      tryFinish();
    }, 7000);
    const handleLoad = () => {
      window.clearTimeout(fallbackTimer);
      pageLoaded = true;
      tryFinish();
    };
    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      tryFinish();
    }, reducedMotion ? 0 : minimumDuration);

    if (pageLoaded) tryFinish();
    else {
      window.addEventListener("load", handleLoad, { once: true });
      // Recheck after subscribing to avoid missing a load event between the
      // readyState check and listener registration.
      if (document.readyState === "complete") handleLoad();
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(minimumTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, [minimumDuration]);
  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      callback.current?.();
    }, 700);
    return () => window.clearTimeout(timer);
  }, [exiting]);
  if (!visible) return null;
  return <div className={`shabka-preloader${exiting ? " is-exiting" : ""}`} role="status" aria-label={label}>
    <div className="shabka-preloader__mark">{children}</div>
  </div>;
}

export function BrandDefs({ id }: { id: string }) {
  return <defs>
    <linearGradient id={`${id}-green`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#006548"/><stop offset="1" stopColor="#00392b"/></linearGradient>
    <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e2b830"/><stop offset="1" stopColor="#bd8d14"/></linearGradient>
  </defs>;
}
