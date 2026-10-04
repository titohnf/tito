import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { daftarTulisan } from "@/content/konten";

// Halaman /rekam-jejak (beserta detailnya), /pembelajaran, dan /studi-kasus belum dimasukkan karena
// tidak ada di menu dan masih "sedang dikembangkan".
export default function sitemap(): MetadataRoute.Sitemap {
  const sekarang = new Date();
  return [
    { url: site.url, lastModified: sekarang, changeFrequency: "monthly", priority: 1 },
    ...daftarTulisan().map((t) => ({
      url: `${site.url}/tulisan/${t.slug}`,
      lastModified: t.tanggal,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
