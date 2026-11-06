import site from "../lib.json";

export type Division = (typeof site.divisions.items)[number];
export type FooterColumn = (typeof site.footer.columns)[number];
