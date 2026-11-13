"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./preloaders.css";

export type PreloaderProps = { onComplete?: () => void };

type Props = PreloaderProps & { children: ReactNode; label: string };

/** Stay over the page until its initial document load completes, then fade away. */
export function PreloaderShell({ children, label, onComplete }: Props) {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const callback = useRef(onComplete);
  useEffect(() => { callback.current = onComplete; }, [onComplete]);
  useEffect(() => {
    const finishLoading = () => setExiting(true);
    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }
    return () => window.removeEventListener("load", finishLoading);
  }, []);
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
