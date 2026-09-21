"use client";

import { useLove } from "@/lib/love";
import styles from "./TombolLove.module.css";

/**
 * Tombol hati dengan penghitung. Angkanya diambil setelah halaman termuat
 * (semua tombol di satu halaman dikumpulkan jadi satu request di src/lib/love.ts),
 * jadi selama belum termuat yang tampil hanya hatinya.
 */
export function TombolLove({ id, label }: { id: string; label: string }) {
  const { jumlah, disukai, ubah } = useLove(id);

  return (
    <button
      type="button"
      className={styles.love}
      data-disukai={disukai}
      onClick={(e) => {
        // Kartu di sekitarnya kadang punya tautannya sendiri — jangan ikut terpicu
        e.preventDefault();
        e.stopPropagation();
        ubah();
      }}
      aria-pressed={disukai}
      aria-label={disukai ? `Batalkan suka: ${label}` : `Suka: ${label}`}
    >
      {/* Satu bentuk yang sama untuk kedua keadaan — hanya isinya yang berubah.
          Sebelumnya memakai karakter ♥ dan ♡: itu dua glyph berbeda yang kerap
          diambil dari font berbeda, jadi bentuk dan lebarnya tidak pernah sama. */}
      <svg className={styles.hati} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.3 10.55 18.98C5.4 14.24 2 11.16 2 7.4 2 4.42 4.42 2 7.4 2c1.74 0 3.41.81 4.6 2.09C13.19 2.81 14.86 2 16.6 2 19.58 2 22 4.42 22 7.4c0 3.76-3.4 6.84-8.55 11.58L12 20.3Z" />
      </svg>
      {jumlah !== null && jumlah > 0 && <span className={styles.jumlah}>{jumlah}</span>}
    </button>
  );
}
