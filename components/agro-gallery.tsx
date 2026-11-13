import { BusinessGallery, type BusinessGalleryImage } from "./business-gallery";

const gallery: readonly BusinessGalleryImage[] = [
  { src: "/agro%20images/gallery/01-rice-fields-sunrise-2.39x1.png", alt: "Rice fields catching the first light of sunrise", width: 1939, height: 811 },
  { src: "/agro%20images/gallery/02-harvest-baskets-1x1.png", alt: "Freshly harvested produce gathered in baskets", width: 1254, height: 1254 },
  { src: "/agro%20images/gallery/03-dewy-rice-paddy-4x5.png", alt: "Dew-covered young rice plants growing in a paddy", width: 1122, height: 1402 },
  { src: "/agro%20images/gallery/04-soil-and-seedling-2x3.png", alt: "A young seedling emerging from rich soil", width: 1024, height: 1536 },
  { src: "/agro%20images/gallery/05-sustainable-irrigation-16x9.png", alt: "Water channels supporting sustainable crop irrigation", width: 1672, height: 941 },
  { src: "/agro%20images/gallery/06-produce-sorting-3x2.png", alt: "Farm produce being sorted after harvest", width: 1536, height: 1024 },
  { src: "/agro%20images/gallery/07-irrigation-canal-4x3.png", alt: "An irrigation canal carrying water through cultivated land", width: 1448, height: 1086 },
  { src: "/agro%20images/gallery/08-seedling-and-grains-1x1.png", alt: "Seedling and grains representing the start of a harvest", width: 1254, height: 1254 },
  { src: "/agro%20images/gallery/09-millet-field-3x4.png", alt: "Millet growing across a green field", width: 1086, height: 1448 },
  { src: "/agro%20images/gallery/10-harvest-basket-2x3.png", alt: "A basket filled with freshly gathered crops", width: 1024, height: 1536 },
];

const desktopColumns = [[1, 6, 7], [2, 3, 4], [0, 5, 8, 9]] as const;
const compactColumns = [[0, 1, 3, 4, 8], [2, 5, 6, 7, 9]] as const;

export function AgroGallery() {
  return <BusinessGallery
    gallery={gallery}
    title="Rooted in the land, grown with care."
    titleId="agro-gallery-title"
    desktopColumns={desktopColumns}
    compactColumns={compactColumns}
  />;
}
