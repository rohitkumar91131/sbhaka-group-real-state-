"use client";

import { BrandDefs, PreloaderShell, type PreloaderProps } from "./PreloaderShell";

export default function ImpexPreloader(props: PreloaderProps) {
  return <PreloaderShell {...props} label="Loading Shabka Impex">
    <svg className="mark-svg impex-mark" viewBox="0 0 1000 900" aria-hidden="true">
      <BrandDefs id="impex" />
      {/* Globe is behind the foreground trade elements. */}
      <g fill="none" stroke="url(#impex-green)" strokeLinecap="round">
        <path className="line-draw impex-globe-outer" pathLength={100} d="M225 565 A355 355 0 1 1 760 752 A355 355 0 0 1 265 725" strokeWidth="30"/>
        <path className="line-draw impex-globe-grid" pathLength={100} d="M495 95 C255 280 260 570 450 825 M505 95 C745 275 740 570 550 825 M500 90 V410 M290 240 Q500 355 720 245 M220 410 Q500 520 775 405" strokeWidth="14"/>
      </g>
      <g className="impex-ship">
        <g fill="url(#impex-green)"><path d="M268 480 H382 V600 H268Z"/><path d="M388 460 H502 V600 H388Z"/><path d="M508 480 H622 V600 H508Z"/><path d="M210 575 H290 V615 H210Z"/>
          <path d="M185 635 Q305 622 435 622 H565 Q650 560 720 570 Q670 630 640 700 Q510 744 345 711 Q232 697 185 635Z"/></g>
        <path d="M245 575 V526 H300 V575" stroke="#00513d" strokeWidth="13" fill="none"/>
        <path d="M300 490 V587 M350 490 V587 M420 475 V590 M470 475 V590 M540 495 V590 M590 495 V590" stroke="#001f18" strokeWidth="6" fill="none"/>
      </g>
      <g className="impex-container">
        <path d="M690 645 L850 585 L962 640 V755 L830 780 L690 760Z" fill="#003b2c" stroke="#005742" strokeWidth="14" strokeLinejoin="round"/>
        <path d="M830 780 V660 L962 640 M715 670 V744 M747 659 V750 M780 648 V758 M810 638 V764 M860 667 V755 M894 655 V750 M929 647 V743" fill="none" stroke="#087052" strokeWidth="8"/>
      </g>
      <g className="impex-plane" fill="url(#impex-green)">
        <path d="M510 285 Q620 290 685 315 L825 206 Q875 172 914 186 Q925 194 895 218 L725 341 L650 373 L616 355 L661 320 L535 308Z"/>
        <path d="M704 322 L780 420 L821 409 L765 285Z"/>
      </g>
      <g fill="none" stroke="url(#impex-gold)" strokeLinecap="round">
        <path className="line-draw impex-gold-top" pathLength={100} d="M415 450 C445 350 555 295 665 267" strokeWidth="19"/>
        <path className="line-draw impex-gold-right" pathLength={100} d="M825 265 C985 335 955 475 705 525" strokeWidth="22"/>
        <path className="line-draw impex-gold-bottom" pathLength={100} d="M165 754 C300 670 420 748 515 765 C615 788 675 740 720 730" strokeWidth="29"/>
      </g>
    </svg>
  </PreloaderShell>;
}
