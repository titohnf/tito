"use client";

import { useState } from "react";
import styles from "./FunFakta.module.css";

/** Jumlah fakta yang tampil sekaligus; daftar tidak pernah lebih panjang dari ini. */
const TAMPIL = 3;

/**
 * Daftar fun fact ringkas pengganti paragraf di segmen Tentang.
 * Tombol "more" menggeser daftar satu fakta, bukan membentangkan semuanya,
 * jadi tinggi blok tetap sama persis seperti daftar berhitung di paulstamatiou.com.
 * Satu fakta = satu baris; kalimat yang kepanjangan dipotong dengan elipsis.
 */
export function FunFakta({ fakta }: { fakta: string[] }) {
  // Indeks fakta teratas yang sedang tampil
  const [mulai, setMulai] = useState(0);
  const adaSisa = fakta.length > TAMPIL;

  // Jendela geser yang memutar kembali ke awal setelah fakta terakhir.
  // Satu baris ekstra dirender di bawah ambang jendela: jadi cadangan saat animasi
  // melewati posisi akhir (bounce), supaya tidak ada celah kosong yang berkedip.
  const tampak = Math.min(TAMPIL, fakta.length);
  const tampil = Array.from({ length: Math.min(TAMPIL + 1, fakta.length) }, (_, i) => {
    const indeks = (mulai + i) % fakta.length;
    return { indeks, teks: fakta[indeks] };
  });

  return (
    <div className={styles.wadah}>
      <div
        className={styles.jendela}
        style={{ "--jumlah": tampak } as React.CSSProperties}
      >
        {/* key = posisi jendela: tiap geseran memutar ulang animasi naik satu baris */}
        <ul key={mulai} className={styles.daftar} aria-live="polite">
          {tampil.map(({ indeks, teks }, i) => (
            // Baris cadangan di luar jendela tidak perlu dibacakan screen reader
            <li
              key={indeks}
              className={styles.item}
              // Baris terbawah (dan cadangannya) baru masuk: tanpa pantulan
              data-baru={i >= tampak - 1}
              aria-hidden={i >= tampak || undefined}
            >
              <svg className={styles.tanda} viewBox="0 0 12 12" aria-hidden="true">
                <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" />
              </svg>
              <span className={styles.teks}>{teks}</span>
            </li>
          ))}
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
