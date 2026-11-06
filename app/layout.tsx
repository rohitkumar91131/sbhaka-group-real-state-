import type { Metadata } from "next";
import site from "../lib.json";
import "./globals.css";

const cssVariables = (values: Record<string, string>) => Object.entries(values).map(([key, value]) => `${key}:${value}`).join(";");

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head><style>{`:root{${cssVariables(site.theme.light)}}@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){${cssVariables(site.theme.dark)}}}:root[data-theme="dark"]{${cssVariables(site.theme.dark)}}`}</style></head>
      <body>{children}</body>
    </html>
  );
}
