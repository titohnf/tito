import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.judulSeo, template: `%s — ${site.nama}` },
  description: site.deskripsiSeo,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.nama,
    title: site.judulSeo,
    description: site.deskripsiSeo,
    // Gambar diambil otomatis dari src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: site.judulSeo,
    description: site.deskripsiSeo,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
