"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LaporanKerja } from "@/content/laporan-kerja";
import { tautanLaporan } from "@/content/laporan-kerja";
import { TagSegmen } from "./TagSegmen";
import { TabSegmen, hitungSegmen, saringSegmen, useTabSegmen } from "./TabSegmen";
import styles from "./KartuGrid.module.css";

export function DaftarRekamJejak({ items }: { items: LaporanKerja[] }) {
  const jumlah = useMemo(() => hitungSegmen(items), [items]);
  const [aktif, setAktif] = useTabSegmen();
  const tampil = saringSegmen(items, aktif);

  return (
    <div style={{ marginTop: "2rem" }}>
      <TabSegmen aktif={aktif} onPilih={setAktif} jumlah={jumlah} />

      {tampil.length === 0 ? (
        <div className={styles.kosong}>
          <span className={styles.kosongIkon} aria-hidden="true">
            (kosong)
          </span>
          <p>Belum ada proyek di kategori ini. Balik lagi nanti, ya.</p>
        </div>
      ) : (
      <ul className={`${styles.grid} ${styles.grid3}`}>
        {tampil.map((l) => {
          const href = tautanLaporan(l);
          return (
          <li key={l.judul}>
            <div className={styles.kartu}>
              <div className={styles.gambarKartu}>
                {l.gambar ? (
                  <Image src={l.gambar} alt="" fill sizes="(min-width: 1000px) 22rem, 100vw" />
                ) : (
                  <span aria-hidden="true">Gambar</span>
                )}
              </div>
              {l.tahun && <span className={styles.nomor}>{l.tahun}</span>}
              <TagSegmen segmen={l.segmen} panjang />
              <h2 className={styles.namaKartu}>{l.judul}</h2>
              {l.tim && <p className={styles.sub}>{l.tim}</p>}
              {l.pencapaian && <p className={styles.ringkasan}>{l.pencapaian}</p>}
              {href && (
                <p className={styles.status}>
                  <Link href={href} className={styles.tautanKartu}>
                    Lihat selengkapnya <span aria-hidden="true">→</span>
                  </Link>
                </p>
              )}
            </div>
          </li>
          );
        })}
      </ul>
      )}
    </div>
  );
}
