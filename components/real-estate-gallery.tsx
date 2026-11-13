"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "./use-scroll-reveal";

const gallery = [
  {
    src: "/real%20state%20images/gallery%20images/01-land-plot-aerial.png",
    motion: "/real%20state%20images/gallery%20images/motion-01-land-drift.gif",
    motionWidth: 420,
    motionHeight: 240,
    alt: "Aerial view of a cleared land plot bordered by trees",
    width: 1672,
    height: 941,
  },
  {
    src: "/real%20state%20images/gallery%20images/02-foundation-rebar.png",
    alt: "Reinforcement steel prepared for a building foundation",
    width: 1122,
    height: 1402,
  },
  {
    src: "/real%20state%20images/gallery%20images/03-completed-home.png",
    motion: "/real%20state%20images/gallery%20images/motion-02-home-reveal.gif",
    motionWidth: 320,
    motionHeight: 400,
    alt: "Completed modern home set among mature trees and planting",
    width: 1086,
    height: 1448,
  },
  {
    src: "/real%20state%20images/gallery%20images/04-planning-materials.png",
    motion: "/real%20state%20images/gallery%20images/motion-03-plan-detail.gif",
    motionWidth: 360,
    motionHeight: 360,
    alt: "Architectural site plan and material samples arranged on a table",
    width: 1254,
    height: 1254,
  },
  {
    src: "/real%20state%20images/gallery%20images/05-development-aerial.png",
    alt: "Aerial view of a development road running through green land",
    width: 1536,
    height: 1024,
  },
  {
    src: "/real%20state%20images/gallery%20images/06-stone-craft-detail.png",
    alt: "Close detail of carefully laid natural stonework",
    width: 1024,
    height: 1536,
  },
  {
    src: "/real%20state%20images/gallery%20images/07-courtyard-home.png",
    alt: "A shaded home courtyard surrounded by trees and garden planting",
    width: 1448,
    height: 1086,
  },
  {
    src: "/real%20state%20images/gallery%20images/08-construction-column.png",
    alt: "A concrete column under construction with timber formwork",
    width: 1122,
    height: 1402,
  },
  {
    src: "/real%20state%20images/gallery%20images/09-architecture-detail.png",
    alt: "Stone façade and deep roofline of a contemporary home",
    width: 1254,
    height: 1254,
  },
  {
    src: "/real%20state%20images/gallery%20images/10-community-at-dusk.png",
    alt: "A residential community and tree-lined road at dusk",
    width: 1672,
    height: 941,
  },
] as const;

const desktopColumns = [[1, 5, 9], [2, 3, 8], [0, 4, 6, 7]] as const;
const compactColumns = [[0, 2, 3, 5, 9], [1, 4, 6, 7, 8]] as const;

const revealSteps = [
  { selector: ".real-estate-gallery-heading", duration: 0.48, y: 10 },
  { selector: ".real-estate-gallery-item", duration: 0.46, y: 12, stagger: 0.06 },
] as const;

export function RealEstateGallery() {
  const root = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [columnCount, setColumnCount] = useState(3);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    width: number;
    height: number;
    isGif: boolean;
  } | null>(null);
  useScrollReveal(root, revealSteps);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 860px)");
    const updateColumns = () => setColumnCount(compact.matches ? 2 : 3);
    updateColumns();
    compact.addEventListener("change", updateColumns);
    return () => compact.removeEventListener("change", updateColumns);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedImage && dialog && !dialog.open) dialog.showModal();
  }, [selectedImage]);

  const renderGalleryItem = (index: number) => {
    const image = gallery[index];
    const src = motionAllowed && "motion" in image && image.motion ? image.motion : image.src;
    const isGif = motionAllowed && src.endsWith(".gif");
    const width = isGif && "motionWidth" in image ? image.motionWidth : image.width;
    const height = isGif && "motionHeight" in image ? image.motionHeight : image.height;

    return <figure className={`real-estate-gallery-item gallery-item-${index + 1}`} key={image.src}>
      <div className="real-estate-gallery-image">
        <button
          className="real-estate-gallery-open"
          type="button"
          aria-label={`Open larger image: ${image.alt}`}
          onClick={() => setSelectedImage({ src, alt: image.alt, width, height, isGif })}
        >
          <Image
            src={src}
            alt={image.alt}
            width={width}
            height={height}
            sizes="(max-width: 520px) 90vw, (max-width: 860px) 45vw, 33vw"
            unoptimized={isGif}
          />
        </button>
      </div>
    </figure>;
  };

  return <section ref={root} className="real-estate-gallery" aria-labelledby="real-estate-gallery-title">
    <div className="wrap">
      <div className="real-estate-gallery-heading">
        <h2 id="real-estate-gallery-title">Land, homes, and the details that bring them to life.</h2>
      </div>
      <div className="real-estate-gallery-columns">
        {(columnCount === 3 ? desktopColumns : compactColumns).map((column, columnIndex) => <div className="real-estate-gallery-column" key={columnIndex}>
          {column.map(renderGalleryItem)}
        </div>)}
      </div>
    </div>
    <dialog
      ref={dialogRef}
      className="real-estate-image-dialog"
      aria-label="Image preview"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      onClose={() => setSelectedImage(null)}
    >
      {selectedImage && <div className="real-estate-image-dialog-content">
        <button className="real-estate-image-dialog-close" type="button" autoFocus onClick={() => dialogRef.current?.close()}>
          <span aria-hidden="true">×</span><span className="sr-only">Close image preview</span>
        </button>
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={selectedImage.width}
          height={selectedImage.height}
          sizes="94vw"
          unoptimized={selectedImage.isGif}
        />
      </div>}
    </dialog>
  </section>;
}
