"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./KataDinamis.module.css";

/**
 * Kata yang berganti otomatis dengan fade/slide halus.
 * - Kata-kata diposisikan absolut di tengah slot, di atas "pengisi" tak terlihat
 *   yang berisi kata aktif, sehingga tinggi baris tidak pernah berubah.
 * - Di layar lebar (judul satu baris), lebar slot bertransisi mengikuti kata aktif.
 * - Di layar sempit, kata berada di barisnya sendiri (lihat CSS).
 * - Saat `kunci` aktif, rotasi berhenti dan `kataAkhir` masuk sebagai kata terakhir.
 */
export function KataDinamis({
  kata,
  intervalMs = 3000,
  kataAkhir,
  kunci = false,
}: {
  kata: string[];
  intervalMs?: number;
  kataAkhir?: string;
  kunci?: boolean;
}) {
  const [urutan, setUrutan] = useState({ aktif: 0, sebelum: -1 });
  const [lebar, setLebar] = useState<number[]>([]);
  const refKata = useRef<(HTMLSpanElement | null)[]>([]);
  // kataAkhir ikut dirender (dan diukur) sejak awal agar transisi lebarnya mulus
  const daftar = useMemo(() => (kataAkhir ? [...kata, kataAkhir] : kata), [kata, kataAkhir]);
  const terkunci = kunci && !!kataAkhir;

  useEffect(() => {
    if (terkunci || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setUrutan((u) => ({ sebelum: u.aktif, aktif: (u.aktif + 1) % kata.length }));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [kata.length, intervalMs, terkunci]);

  useEffect(() => {
    setUrutan((u) => {
      if (terkunci) return { sebelum: u.aktif, aktif: kata.length };
      // Kunci dilepas: kataAkhir keluar, kembali ke kata pertama
      return u.aktif === kata.length ? { sebelum: u.aktif, aktif: 0 } : u;
    });
  }, [terkunci, kata.length]);

  // Ukur lebar tiap kata (ulang saat font selesai dimuat & saat ukuran layar berubah)
  useLayoutEffect(() => {
    const ukur = () => setLebar(refKata.current.map((el) => el?.offsetWidth ?? 0));
    ukur();
    document.fonts?.ready.then(ukur);
    window.addEventListener("resize", ukur);
    return () => window.removeEventListener("resize", ukur);
  }, [daftar]);

  const gaya = lebar[urutan.aktif]
    ? ({ "--lebar-kata": `${lebar[urutan.aktif]}px` } as React.CSSProperties)
    : undefined;

  return (
    <span className={styles.slot} style={gaya}>
      {/* Pembaca layar cukup membaca kata pertama, tanpa pengumuman berulang */}
      <span className="sr-only">{terkunci ? kataAkhir : kata[0]}</span>
      <span className={styles.tumpuk} aria-hidden="true">
        {/* Pengisi tak terlihat: memberi tinggi, baseline, dan lebar dasar sesuai kata aktif */}
        <span className={styles.pengisi}>{daftar[urutan.aktif]}</span>
        {daftar.map((k, i) => (
          <span
            key={k}
            ref={(el) => {
              refKata.current[i] = el;
            }}
            className={styles.kata}
            data-akhir={kataAkhir && i === kata.length ? "" : undefined}
            data-state={i === urutan.aktif ? "aktif" : i === urutan.sebelum ? "keluar" : "diam"}
          >
            {k}
          </span>
        ))}
      </span>
    </span>
  );
}
