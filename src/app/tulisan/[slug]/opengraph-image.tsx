import { gambarOg, ukuranOg } from "@/lib/og";
import { daftarTulisan } from "@/content/konten";
import { site } from "@/config/site";

export const alt = site.judulSeo;
export const size = ukuranOg;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return daftarTulisan().map((t) => ({ slug: t.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tulisan = daftarTulisan().find((t) => t.slug === slug);
  return gambarOg(tulisan?.judul ?? site.judulSeo, "Tulisan");
}
