import type { Metadata, Viewport } from "next";
import { Inter, Patrick_Hand } from "next/font/google";
import { site } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PelacakWA } from "@/components/PelacakWA";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Tulisan tangan untuk segmen Daftar ide (kertas catatan di bawah hero).
const tulis = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tulis",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.judulSeo, template: `%s — ${site.nama}` },
  description: site.deskripsiSeo,
  alternates: { canonical: "/" },
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
  themeColor: "#FFFFFF",
};

const dataTerstruktur = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#tito`,
      name: site.nama,
      url: site.url,
      image: `${site.url}${site.fotoAsli}`,
      jobTitle: "Desainer produk",
      description: site.deskripsiSeo,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${tulis.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dataTerstruktur).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <PelacakWA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
