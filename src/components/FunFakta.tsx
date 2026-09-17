"use client";

import { useState } from "react";
import styles from "./FunFakta.module.css";

/** Jumlah fakta yang tampil sekaligus kalau pemanggil tidak menentukan. */
const BAWAAN = 3;

/**
 * Daftar fun fact ringkas pengganti paragraf di segmen Tentang.
 * Tombol "more" menggeser daftar satu fakta, bukan membentangkan semuanya,
 * jadi tinggi blok tetap sama persis seperti daftar berhitung di paulstamatiou.com.
 * `baris` = berapa fakta yang tampak sekaligus.
 * Satu fakta = satu baris; kalimat yang kepanjangan dipotong dengan elipsis.
 */
export function FunFakta({ fakta, baris = BAWAAN }: { fakta: string[]; baris?: number }) {
  const TAMPIL = baris;
  // Indeks fakta teratas yang sedang tampil
  const [mulai, setMulai] = useState(0);
  const adaSisa = fakta.length > TAMPIL;

  // Jendela geser yang memutar kembali ke awal setelah fakta terakhir.
  // Di luar jendela ada dua baris tambahan: satu di atas (fakta yang sedang
  // keluar, mengecil sambil naik) dan satu di bawah sebagai cadangan saat
  // animasi melewati posisi akhirnya (bounce), supaya tidak ada celah berkedip.
  const tampak = Math.min(TAMPIL, fakta.length);
  const jumlah = adaSisa ? Math.min(TAMPIL + 2, fakta.length) : tampak;
  const tampil = Array.from({ length: jumlah }, (_, i) => {
    // i = 0 adalah baris yang keluar, jadi jendela mulai dari i = 1
    const geser = adaSisa ? i - 1 : i;
    const indeks = (mulai + geser + fakta.length) % fakta.length;
    return { indeks, teks: fakta[indeks] };
  });

  return (
    <div className={styles.wadah}>
      <div
        className={styles.jendela}
        style={{ "--jumlah": tampak } as React.CSSProperties}
      >
        {/* key = posisi jendela: tiap geseran memutar ulang animasi naik satu baris */}
        <ul
          key={mulai}
          className={styles.daftar}
          data-geser={adaSisa}
          aria-live="polite"
        >
          {tampil.map(({ indeks, teks }, i) => {
            // Baris di luar jendela (yang keluar & cadangan) tidak dibacakan
            const keluar = adaSisa && i === 0;
            const diJendela = adaSisa ? i >= 1 && i <= tampak : i < tampak;
            return (
            <li
              key={indeks}
              className={styles.item}
              // Baris terbawah (dan cadangannya) baru masuk: tanpa pantulan
              data-baru={adaSisa ? i >= TAMPIL : i >= tampak - 1}
              data-keluar={keluar || undefined}
              aria-hidden={!diJendela || undefined}
            >
              <svg className={styles.tanda} viewBox="0 0 12 12" aria-hidden="true">
                <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" />
              </svg>
              <span className={styles.teks}>{teks}</span>
            </li>
            );
          })}
        </ul>
      </div>

      {adaSisa && (
        <button
          type="button"
          className={styles.lagi}
          onClick={() => setMulai((m) => (m + 1) % fakta.length)}
        >
          Berikutnya <span aria-hidden="true">↓</span>
        </button>
      )}
    </div>
  );
}
