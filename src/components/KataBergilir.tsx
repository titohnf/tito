"use client";

import { useEffect, useState } from "react";
import styles from "./KataBergilir.module.css";

type Props = {
  kata: readonly string[];
  /** Kapan efek ketik mulai berjalan (ms), supaya tidak bersaing dengan animasi pembuka. */
  mulai?: number;
  /** Lama kata utuh ditampilkan sebelum dihapus (ms). */
  tahan?: number;
};

/**
 * Satu kata di dalam kalimat yang berganti mengikuti persona pengunjung
 * (bisnis, organisasi, ...), dibungkus kotak dengan efek mesin ketik.
 * Server dan klien sama-sama menampilkan kata pertama secara utuh, jadi tanpa
 * JavaScript atau dengan "kurangi gerakan" kalimatnya tetap lengkap.
 */
export function KataBergilir({ kata, mulai = 1200, tahan = 1900 }: Props) {
  const [teks, setTeks] = useState(kata[0]);

  useEffect(() => {
    if (kata.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let batal = false;
    let timer: ReturnType<typeof setTimeout>;
    let idx = 0;
    let panjang = kata[0].length;
    let mode: "hapus" | "ketik" = "hapus";

    const langkah = () => {
      if (batal) return;
      if (mode === "hapus") {
        if (panjang > 0) {
          panjang -= 1;
          setTeks(kata[idx].slice(0, panjang));
          timer = setTimeout(langkah, 45);
        } else {
          idx = (idx + 1) % kata.length;
          mode = "ketik";
          timer = setTimeout(langkah, 250);
        }
        return;
      }
      if (panjang < kata[idx].length) {
        panjang += 1;
        setTeks(kata[idx].slice(0, panjang));
        timer = setTimeout(langkah, 85);
      } else {
        mode = "hapus";
        timer = setTimeout(langkah, tahan);
      }
    };

    timer = setTimeout(langkah, mulai);
    return () => {
      batal = true;
      clearTimeout(timer);
    };
  }, [kata, mulai, tahan]);

  return (
    <span className={styles.kotak}>
      <span className={styles.sr}>{kata.join(", ")}</span>
      <span className={styles.teks} aria-hidden="true">
        {teks}
        <span className={styles.kursor} />
      </span>
    </span>
  );
}
