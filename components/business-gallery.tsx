"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "./use-scroll-reveal";
import { imageBlurData } from "./image-blur-data";

export type BusinessGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  motion?: string;
  motionWidth?: number;
  motionHeight?: number;
};

type Props = {
  gallery: readonly BusinessGalleryImage[];
  title: string;
  titleId: string;
  desktopColumns: readonly (readonly number[])[];
  compactColumns: readonly (readonly number[])[];
};

const revealSteps = [
  { selector: ".business-gallery-heading", duration: 0.48, y: 10 },
  { selector: ".business-gallery-item", duration: 0.46, y: 12, stagger: 0.06 },
] as const;

export function BusinessGallery({ gallery, title, titleId, desktopColumns, compactColumns }: Props) {
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
    blurDataURL?: string;
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
    const src = motionAllowed && image.motion ? image.motion : image.src;
    const isGif = motionAllowed && src.endsWith(".gif");
    const width = isGif ? image.motionWidth ?? image.width : image.width;
    const height = isGif ? image.motionHeight ?? image.height : image.height;
    const blurDataURL = imageBlurData[src];

    return <figure className="business-gallery-item" key={image.src}>
      <div className="business-gallery-image">
        <button
          className="business-gallery-open"
          type="button"
          aria-label={`Open larger image: ${image.alt}`}
          onClick={() => setSelectedImage({ src, alt: image.alt, width, height, isGif, blurDataURL })}
        >
          <Image
            src={src}
            alt={image.alt}
            width={width}
            height={height}
            sizes="(max-width: 520px) 90vw, (max-width: 860px) 45vw, 33vw"
            unoptimized={isGif}
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
          />
        </button>
      </div>
    </figure>;
  };

  return <section ref={root} className="business-gallery" aria-labelledby={titleId}>
    <div className="wrap">
      <div className="business-gallery-heading">
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className="business-gallery-columns">
        {(columnCount === 3 ? desktopColumns : compactColumns).map((column, columnIndex) => <div className="business-gallery-column" key={columnIndex}>
          {column.map(renderGalleryItem)}
        </div>)}
      </div>
    </div>
    <dialog
      ref={dialogRef}
      className="business-image-dialog"
      aria-label="Image preview"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      onClose={() => setSelectedImage(null)}
    >
      {selectedImage && <div className="business-image-dialog-content">
        <button className="business-image-dialog-close" type="button" autoFocus onClick={() => dialogRef.current?.close()}>
          <span aria-hidden="true">×</span><span className="sr-only">Close image preview</span>
        </button>
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={selectedImage.width}
          height={selectedImage.height}
          sizes="94vw"
          unoptimized={selectedImage.isGif}
          placeholder={selectedImage.blurDataURL ? "blur" : "empty"}
          blurDataURL={selectedImage.blurDataURL}
        />
      </div>}
    </dialog>
  </section>;
}
