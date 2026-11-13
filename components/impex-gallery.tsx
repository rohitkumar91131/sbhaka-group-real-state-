import { BusinessGallery, type BusinessGalleryImage } from "./business-gallery";

const gallery: readonly BusinessGalleryImage[] = [
  { src: "/impex%20images/gallery/01-container-port-2.39x1.png", alt: "Containers and cargo ship at an international port at sunset", width: 1939, height: 811 },
  { src: "/impex%20images/gallery/02-indian-commodities-flatlay-1x1.png", alt: "Indian spices, textiles, and agricultural commodities arranged for trade", width: 1254, height: 1254 },
  { src: "/impex%20images/gallery/03-warehouse-goods-4x5.png", alt: "Goods stored and ready for shipment in a warehouse", width: 1122, height: 1402 },
  { src: "/impex%20images/gallery/04-jute-and-spices-detail-2x3.png", alt: "Jute rope, spices, and natural trade materials", width: 1024, height: 1536 },
  { src: "/impex%20images/gallery/05-cargo-ship-16x9.png", alt: "Cargo ship arriving at a port during sunset", width: 1672, height: 941 },
  { src: "/impex%20images/gallery/06-export-packing-3x2.png", alt: "Carefully packed goods prepared for export", width: 1536, height: 1024 },
  { src: "/impex%20images/gallery/07-warehouse-aisle-3x4.png", alt: "A clear aisle through a well-stocked warehouse", width: 1086, height: 1448 },
  { src: "/impex%20images/gallery/08-sourcing-compass-1x1.png", alt: "A compass and trade materials laid over a world map", width: 1254, height: 1254 },
  { src: "/impex%20images/gallery/09-cargo-seal-detail-2x3.png", alt: "A sealed shipping container ready for transport", width: 1024, height: 1536 },
  { src: "/impex%20images/gallery/10-freight-train-4x3.png", alt: "Freight train crossing a green landscape in warm evening light", width: 1448, height: 1086 },
];

const desktopColumns = [[1, 6, 7], [2, 3, 4], [0, 5, 8, 9]] as const;
const compactColumns = [[0, 1, 3, 4, 8], [2, 5, 6, 7, 9]] as const;

export function ImpexGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="From sourcing to shipment, every detail matters."
    titleId="impex-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
