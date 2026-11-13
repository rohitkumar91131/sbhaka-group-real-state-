"use client";

import { Fragment, type ReactNode } from "react";

export function AnimatedWords({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className="animated-words" aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <span className="animated-word" aria-hidden="true">{word}</span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function AnimatedReveal({ children }: { children: ReactNode }) {
  return <span className="animated-reveal">{children}</span>;
}
