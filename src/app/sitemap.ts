import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { daftarTulisan } from "@/content/konten";
import { laporanTayang } from "@/content/laporan-kerja";

// Halaman /rekam-jejak dan /pembelajaran belum dimasukkan karena masih "sedang dikembangkan".
export default function sitemap(): MetadataRoute.Sitemap {
  const sekarang = new Date();
  return [
    { url: site.url, lastModified: sekarang, changeFrequency: "monthly", priority: 1 },
    ...laporanTayang().map((l) => ({
      url: `${site.url}/rekam-jejak/${l.detail.slug}`,
      lastModified: sekarang,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...daftarTulisan().map((t) => ({
      url: `${site.url}/tulisan/${t.slug}`,
      lastModified: t.tanggal,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
