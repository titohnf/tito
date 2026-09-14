"use client";

import { useState } from "react";
import { hero } from "@/content/profil";
import styles from "./Hero.module.css";

/**
 * Judul hero dengan julukan yang bisa di-tap untuk berganti (tanpa auto-rotate).
 * Semua varian ditumpuk di sel grid yang sama, jadi tinggi tidak loncat saat berganti.
 */
export function HeroDinamis({ foto, aksi }: { foto: React.ReactNode; aksi: React.ReactNode }) {
  const [aktif, setAktif] = useState(0);
  const jumlah = hero.varian.length;
  const berikut = () => setAktif((i) => (i + 1) % jumlah);

  // Foto diselipkan sebelum kata terakhir sapaan: "Hi, saya [foto] Tito"
  const kata = hero.sapaan.split(" ");
  const nama = kata.pop();

  return (
    <>
      <h1 id="hero-judul" className={styles.judul}>
        <span className={styles.sapaan}>
          {kata.join(" ")} <span className={styles.foto}>{foto}</span> {nama}
        </span>
        <button type="button" className={styles.julukan} onClick={berikut}>
          <span className={styles.tumpuk}>
            {hero.varian.map((v, i) => (
              <span
                key={v.julukan}
                className={styles.varian}
                data-aktif={i === aktif}
                aria-hidden={i !== aktif}
              >
                {v.julukan}
              </span>
            ))}
          </span>
          <span className="sr-only"> ({hero.petunjukGanti.toLowerCase()})</span>
        </button>
      </h1>

      <div className={styles.kontrol}>
        <div className={styles.titik} role="group" aria-label="Pilih julukan">
          {hero.varian.map((v, i) => (
            <button
              key={v.julukan}
              type="button"
              aria-label={v.julukan}
              aria-pressed={i === aktif}
              onClick={() => setAktif(i)}
            />
          ))}
        </div>
        <button type="button" className={styles.ganti} onClick={berikut} aria-hidden="true" tabIndex={-1}>
          {hero.petunjukGanti} <span>↻</span>
        </button>
      </div>

      <div className={styles.bawah}>
        <div className={styles.paragraf}>
          <p className={styles.tumpuk} aria-live="polite">
            {hero.varian.map((v, i) => (
              <span
                key={v.fakta}
                className={styles.varian}
                data-aktif={i === aktif}
                aria-hidden={i !== aktif}
              >
                {v.fakta}
              </span>
            ))}
          </p>
        </div>
        {aksi}
      </div>
    </>
  );
}
