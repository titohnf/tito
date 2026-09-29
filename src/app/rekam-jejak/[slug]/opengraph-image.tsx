import { gambarOg, ukuranOg } from "@/lib/og";
import { laporanTayang } from "@/content/laporan-kerja";
import { site } from "@/config/site";

export const alt = site.judulSeo;
export const size = ukuranOg;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return laporanTayang().map((l) => ({ slug: l.detail.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyek = laporanTayang().find((l) => l.detail.slug === slug);
  return gambarOg(proyek?.judul ?? site.judulSeo, "Rekam jejak");
}
