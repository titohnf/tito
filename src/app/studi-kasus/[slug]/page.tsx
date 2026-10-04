import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SedangDikembangkan } from "@/components/SedangDikembangkan";
import { kartuStudiKasus } from "@/content/portofolio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return kartuStudiKasus().map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const k = kartuStudiKasus().find((x) => x.slug === slug);
  return k ? { title: k.judul, robots: { index: false } } : {};
}

export default async function HalamanStudiKasus({ params }: Props) {
  const { slug } = await params;
  const k = kartuStudiKasus().find((x) => x.slug === slug);
  if (!k) notFound();
  return <SedangDikembangkan bagian={k.judul} />;
}

/*
 * Halaman studi kasus yang asli, disimpan sementara sebagai komentar sampai
 * tulisannya siap. Untuk menampilkannya lagi: ganti seluruh kode di atas dengan
 * kode di bawah ini (hapus penanda komentar).
 *
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { kartuStudiKasus } from "@/content/portofolio";
import { site } from "@/config/site";
import styles from "./studi.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return kartuStudiKasus().map((k) => ({ slug: k.slug }));
}

function cari(slug: string) {
  return kartuStudiKasus().find((k) => k.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const k = cari(slug);
  if (!k) return {};
  return {
    title: k.judul,
    description: k.deskripsi,
    alternates: { canonical: `/studi-kasus/${slug}` },
    openGraph: { title: k.judul, description: k.deskripsi },
  };
}

function Bagian({ id, judul }: { id: string; judul: string }) {
  return (
    <section className={styles.bagian} aria-labelledby={id}>
      <h2 id={id} className={styles.judulBagian}>
        {judul}
      </h2>
      <p className={styles.menyusul}>Sedang ditulis.</p>
    </section>
  );
}

export default async function HalamanStudiKasus({ params }: Props) {
  const { slug } = await params;
  const k = cari(slug);
  if (!k) notFound();

  return (
    <HalamanSederhana label="Studi kasus" judul={k.judul} lebar kembali={{ href: "/", label: "Kembali ke beranda" }}>
      {k.deskripsi && <p className={styles.ringkas}>{k.deskripsi}</p>}
      {k.teks && <p className={styles.teks}>{k.teks}</p>}

      {k.video && (
        <div className={`${styles.layar} ${k.mobile ? styles.layarMobile : ""}`}>
          <video src={k.video} poster={k.poster} controls loop muted playsInline preload="metadata" />
        </div>
      )}

      <Bagian id="konteks" judul="Konteks" />
      <Bagian id="proses" judul="Proses" />
      <Bagian id="hasil" judul="Hasil" />

      <div className="aksi">
        {k.situs && (
          <Tombol href={k.situs} varian="garis" eksternal>
            Kunjungi website <span aria-hidden="true">↗</span>
          </Tombol>
        )}
        <Tombol href={`/${site.tautan.ngobrol}`}>Ayo ngobrol</Tombol>
      </div>
    </HalamanSederhana>
  );
}

 */
