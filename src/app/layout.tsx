import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PelacakWA } from "@/components/PelacakWA";
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
      jobTitle: "Desainer dan pengembang website",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#layanan`,
      name: `${site.nama} — Jasa Website untuk Usaha Kecil`,
      url: site.url,
      description: site.deskripsiSeo,
      inLanguage: "id-ID",
      areaServed: { "@type": "Country", name: "Indonesia" },
      founder: { "@id": `${site.url}/#tito` },
      telephone: `+${site.whatsapp}`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${mono.variable}`}>
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
