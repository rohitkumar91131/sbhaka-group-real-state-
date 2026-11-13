
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./LogoPreloader.css";

interface LogoPreloaderProps {
  onComplete?: () => void;
}

export default function LogoPreloader({
  onComplete,
}: LogoPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const minimumDisplayTime = reducedMotion ? 0 : 2550;
    const startedAt = performance.now();
    let exitTimer = 0;

    const exitAfterLoad = () => {
      const remainingAnimationTime = Math.max(
        0,
        minimumDisplayTime - (performance.now() - startedAt)
      );
      exitTimer = window.setTimeout(() => setIsExiting(true), remainingAnimationTime);
    };

    if (document.readyState === "complete") {
      exitAfterLoad();
    } else {
      window.addEventListener("load", exitAfterLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", exitAfterLoad);
      window.clearTimeout(exitTimer);
    };
  }, []);

  const complete = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "opacity" ||
      !isExiting
    ) {
      return;
    }

    complete();
  };

  useEffect(() => {
    if (!isExiting) return;

    const fallback = window.setTimeout(() => {
      complete();
    }, 750);

    return () => window.clearTimeout(fallback);
  }, [isExiting, complete]);

  if (!isVisible) return null;

  return (
    <div
      className={`logo-preloader ${
        isExiting ? "logo-preloader--exit" : ""
      }`}
      onTransitionEnd={handleTransitionEnd}
      role="status"
      aria-label="Loading website"
    >
      <div className="logo-preloader__container">
        <svg
          viewBox="0 0 700 700"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* White circular background */}
          <circle
            className="logo-preloader__background"
            cx="350"
            cy="350"
            r="326"
          />

          {/* 1. Upward Chevron */}
          <path
            className="logo-preloader__draw logo-preloader__chevron"
            pathLength={100}
            d="M195 370 L350 190 L505 370"
          />

          {/* 2. Golden Wave */}
          <path
            className="logo-preloader__draw logo-preloader__wave"
            pathLength={100}
            d="M145 490 C230 420 280 450 350 495 S460 555 555 490"
          />

          {/* 3. Outer Green Circle */}
          <circle
            className="logo-preloader__draw logo-preloader__outer"
            cx="350"
            cy="350"
            r="330"
            pathLength={100}
            transform="rotate(-90 350 350)"
          />

          {/* 4. Inner Gold Circle */}
          <circle
            className="logo-preloader__draw logo-preloader__inner"
            cx="350"
            cy="350"
            r="310"
            pathLength={100}
            transform="rotate(-90 350 350)"
          />
        </svg>
      </div>
    </div>
  );
}

