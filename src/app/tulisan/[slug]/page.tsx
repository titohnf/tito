import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { daftarTulisan, formatTanggal, idKonten } from "@/content/konten";
import { TombolLove } from "@/components/TombolLove";
import { site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return daftarTulisan().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tulisan = daftarTulisan().find((t) => t.slug === slug);
  if (!tulisan) return {};
  return {
    title: tulisan.judul,
    description: tulisan.pengantar,
    openGraph: {
      type: "article",
      title: tulisan.judul,
      description: tulisan.pengantar,
      publishedTime: tulisan.tanggal,
    },
  };
}

export default async function HalamanTulisan({ params }: Props) {
  const { slug } = await params;
  const tulisan = daftarTulisan().find((t) => t.slug === slug);
  if (!tulisan) notFound();

  return (
    <HalamanSederhana
      label={`${formatTanggal(tulisan.tanggal)} · ${tulisan.menitBaca} menit baca`}
      judul={tulisan.judul}
    >
      {tulisan.isi.map((p) => (
        <p key={p}>{p}</p>
      ))}

      <div className="love">
        <TombolLove id={idKonten(tulisan)} label={tulisan.judul} />
      </div>

      <div className="aksi">
        <Tombol href="/pembelajaran" varian="garis">
          Baca yang lain
        </Tombol>
        <Tombol href={`/${site.tautan.ngobrol}`}>Ayo ngobrol</Tombol>
      </div>
    </HalamanSederhana>
  );
}
