"use client";

import { BrandDefs, PreloaderShell, type PreloaderProps } from "./PreloaderShell";

export default function ConstructionsPreloader(props: PreloaderProps) {
  return <PreloaderShell {...props} label="Loading Shabka Constructions">
    <svg className="mark-svg construction-mark" viewBox="0 0 800 800" aria-hidden="true">
      <BrandDefs id="construction" />
      <g className="construction-building">
        <path d="M493 493 V176 L590 100 L679 170 V257 L735 302 V578 H704 V331 L617 275 V537 L581 504 V165 L537 202 V476Z" fill="url(#construction-green)"/>
        <path d="M627 328 L689 369 M627 397 L689 440 M627 465 L689 508" fill="none" stroke="#050505" strokeWidth="19"/>
      </g>
      <g className="construction-crane" fill="none" stroke="url(#construction-green)" strokeWidth="13" strokeLinejoin="round">
        <path d="M210 235 L414 166 L494 230 L198 246Z M414 166 L432 230 M414 166 L393 234 M225 246 V317 M225 317 L208 343 L191 317 M445 233 V430 M445 252 L470 282 L445 310 L470 340 L445 368 L470 395 L445 421"/>
        <path d="M229 419 L355 360 L445 408 M229 484 L356 428 L445 472 M241 380 V528 M298 380 V493 M356 355 V467"/>
      </g>
      <g className="construction-house">
        <path d="M175 565 L406 365 L658 590 H602 L408 431 L242 573 L176 574Z" fill="url(#construction-green)"/>
        <path d="M244 572 L408 444 L589 594 V618 H244Z" fill="#003b2c"/>
        <path d="M362 516 H442 V589 H362Z" fill="#050505"/>
        <path d="M400 516 V589 M362 553 H442" fill="none" stroke="#006449" strokeWidth="10"/>
      </g>
      <g className="construction-road" fill="url(#construction-gold)">
        <path d="M272 650 Q414 594 547 621 Q393 647 311 707Z"/>
        <path d="M356 724 Q540 614 778 638 Q588 678 432 753Z"/>
      </g>
      <path className="line-draw construction-circle" pathLength={100} d="M568 47 C369 -6 178 142 130 348 C65 583 219 760 422 780 C595 797 703 704 731 670" fill="none" stroke="url(#construction-green)" strokeWidth="32" strokeLinecap="round"/>
    </svg>
  </PreloaderShell>;
}
