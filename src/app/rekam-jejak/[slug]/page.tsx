import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { FunFakta } from "@/components/FunFakta";
import { TagSegmen } from "@/components/TagSegmen";
import { Tombol } from "@/components/Tombol";
import { laporanBerdetail, idProyek } from "@/content/laporan-kerja";
import { TombolLove } from "@/components/TombolLove";
import type { AnggotaTim } from "@/content/laporan-kerja";
import { site } from "@/config/site";
import styles from "./detail.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return laporanBerdetail().map((l) => ({ slug: l.detail.slug }));
}

function cari(slug: string) {
  return laporanBerdetail().find((l) => l.detail.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyek = cari(slug);
  if (!proyek) return {};
  return {
    title: proyek.judul,
    description: proyek.pencapaian || undefined,
    openGraph: { title: proyek.judul, description: proyek.pencapaian || undefined },
  };
}

/** Isi bagian, atau penanda kalau bagian itu belum ditulis. */
function Bagian({
  id,
  judul,
  kosong,
  children,
}: {
  id: string;
  judul: string;
  kosong?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={styles.bagian} aria-labelledby={id}>
      <h2 id={id} className={styles.judulBagian}>
        {judul}
      </h2>
      {kosong ? <p className={styles.menyusul}>Sedang ditulis.</p> : children}
    </section>
  );
}

function NamaTim({ orang }: { orang: AnggotaTim }) {
  const nama = orang.linkedin ? (
    <a href={orang.linkedin} target="_blank" rel="noopener noreferrer">
      {orang.nama}
    </a>
  ) : (
    orang.nama
  );
  return (
    <>
      {nama}
      {orang.peran && <span className={styles.peranTim}> — {orang.peran}</span>}
    </>
  );
}

export default async function HalamanProyek({ params }: Props) {
  const { slug } = await params;
  const proyek = cari(slug);
  if (!proyek) notFound();

  const { detail, judul, tahun, tim: instansi, segmen } = proyek;
  const klien = detail.klien || instansi;
  const info: { label: string; nilai: React.ReactNode }[] = [
    ...(detail.peran ? [{ label: "Peran", nilai: detail.peran }] : []),
    ...(tahun ? [{ label: "Tahun", nilai: tahun }] : []),
    ...(klien ? [{ label: "Klien/Institusi", nilai: klien }] : []),
    ...(detail.timRingkas
      ? [{ label: "Tim", nilai: detail.timRingkas }]
      : detail.tim?.length
        ? [
            {
              label: "Tim",
              nilai: (
                <ul className={styles.tim}>
                  {detail.tim.map((o) => (
                    <li key={o.nama}>
                      <NamaTim orang={o} />
                    </li>
                  ))}
                </ul>
              ),
            },
          ]
        : []),
    ...(detail.produk
      ? [
          {
            label: "Link produk asli",
            nilai: (
              <a href={detail.produk.href} target="_blank" rel="noopener noreferrer">
                {detail.produk.label} <span aria-hidden="true">↗</span>
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <HalamanSederhana
      judul={judul}
      lebar
      kembali={{ href: "/rekam-jejak", label: "Kembali ke rekam jejak" }}
    >
      <TagSegmen segmen={segmen} panjang />

      <Bagian id="info" judul="Info Proyek" kosong={info.length === 0}>
        <dl className={styles.info}>
          {info.map((baris) => (
            <div key={baris.label} className={styles.barisInfo}>
              <dt>{baris.label}</dt>
              <dd>{baris.nilai}</dd>
            </div>
          ))}
        </dl>
      </Bagian>

      {detail.funFakta?.length ? (
        <Bagian id="fakta" judul="Fun fact">
          <FunFakta fakta={detail.funFakta} />
        </Bagian>
      ) : null}

      <Bagian id="konteks" judul="Konteks" kosong={!detail.konteks?.length}>
        {detail.konteks?.map((p) => <p key={p}>{p}</p>)}
      </Bagian>

      <Bagian id="proses" judul="Proses" kosong={!detail.proses?.length}>
        {detail.proses?.map((tahap) => (
          <div key={tahap.judul} className={styles.tahap}>
            <h3 className={styles.judulTahap}>{tahap.judul}</h3>
            {tahap.paragraf.length ? (
              tahap.paragraf.map((p) => <p key={p}>{p}</p>)
            ) : (
              <p className={styles.menyusul}>Sedang ditulis.</p>
            )}
            {tahap.gambar?.map((g) => (
              <figure key={g.src} className={styles.gambar}>
                <Image src={g.src} alt={g.keterangan ?? ""} fill sizes="(min-width: 900px) 46rem, 100vw" />
                {g.keterangan && <figcaption>{g.keterangan}</figcaption>}
              </figure>
            ))}
          </div>
        ))}
      </Bagian>

      <Bagian id="hasil" judul="Hasil" kosong={!detail.hasil?.length}>
        <ul className={styles.hasil}>
          {detail.hasil?.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Bagian>

      <Bagian id="kredit" judul="Kredit" kosong={!detail.kredit && !detail.tim?.length}>
        {detail.kredit && <p>{detail.kredit}</p>}
        {detail.tim?.length ? (
          <ul className={styles.tim}>
            {detail.tim.map((o) => (
              <li key={o.nama}>
                <NamaTim orang={o} />
              </li>
            ))}
          </ul>
        ) : null}
      </Bagian>

      <div className="love">
        <TombolLove id={idProyek(detail)} label={judul} />
      </div>

      <div className="aksi">
        <Tombol href="/rekam-jejak" varian="garis">
          Lihat proyek lain
        </Tombol>
        <Tombol href={`/${site.tautan.ngobrol}`}>Ayo ngobrol</Tombol>
      </div>
    </HalamanSederhana>
  );
}
