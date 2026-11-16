import { BusinessGallery, type BusinessGalleryImage } from "./business-gallery";

const gallery: readonly BusinessGalleryImage[] = [
  { src: "/raiment/gallery/atelier-fitting-2.39x1.jpg", alt: "A tailor fitting a garment in the atelier", width: 1912, height: 800 },
  { src: "/raiment/gallery/suiting-stack-3x2.jpg", alt: "A considered selection of fine suiting fabrics", width: 1536, height: 1024 },
  { src: "/raiment/gallery/fabric-library-2x1.jpg", alt: "Shelves of fabric in the Shabka Raiment textile library", width: 1774, height: 887 },
  { src: "/raiment/gallery/ivory-suiting-3x4.jpg", alt: "Ivory suiting cloth with a refined texture", width: 1086, height: 1448 },
  { src: "/raiment/gallery/house-card-5x4.jpg", alt: "Shabka Raiment fabric swatches and collection card", width: 1400, height: 1120 },
  { src: "/raiment/gallery/cutting-table-4x3.jpg", alt: "Cloth laid out for careful cutting and tailoring", width: 1448, height: 1086 },
  { src: "/raiment/gallery/lapel-detail-1x1.jpg", alt: "Fine finishing on a tailored jacket lapel", width: 1254, height: 1254 },
  { src: "/raiment/gallery/finished-suit-9x16.jpg", alt: "A finished suit, tailored for a precise fit", width: 936, height: 1664 },
  { src: "/raiment/gallery/cloth-selection-16x9.jpg", alt: "A selection of fabrics chosen for color, feel, and finish", width: 1664, height: 936 },
  { src: "/raiment/gallery/last-fitting-4x5.jpg", alt: "A final fitting to refine the proportions and comfort of a garment", width: 1120, height: 1400 },
];

const desktopColumns = [[1, 6, 7], [2, 3, 4], [0, 5, 8, 9]] as const;
const compactColumns = [[0, 1, 3, 4, 8], [2, 5, 6, 7, 9]] as const;

export function RaimentGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="From the first thread to the final fitting."
    titleId="raiment-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
