"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BabTentang } from "@/content/profil";
import { FunFakta } from "./FunFakta";
import kartuStyles from "./KartuGrid.module.css";
import styles from "./Sorotan.module.css";

type Kartu = NonNullable<BabTentang["sorotan"]>[number];

/**
 * Deretan kartu sorotan yang bisa digeser ke samping.
 * Menggeser pakai scroll-snap bawaan browser (jadi swipe & keyboard tetap jalan);
 * tombol panah hanya pintasan, dan ikut hilang kalau semua kartu sudah muat.
 */
export function Sorotan({
  kartu,
  label,
  hrefSemua,
  funFakta,
}: {
  kartu: Kartu[];
  label: string;
  /** Kalau diisi, satu kartu tautan ke seluruh rekam jejak ditambahkan di ujung trek. */
  hrefSemua?: string;
  /** Kalau diisi, kartu penutupnya berisi fun fact bab ini, bukan tautan rekam jejak. */
  funFakta?: string[];
}) {
  const trekRef = useRef<HTMLUListElement>(null);
  const [posisi, setPosisi] = useState({ bisaKiri: false, bisaKanan: false });

  const ukur = useCallback(() => {
    const trek = trekRef.current;
    if (!trek) return;
    const sisaKanan = trek.scrollWidth - trek.clientWidth - trek.scrollLeft;
    setPosisi({ bisaKiri: trek.scrollLeft > 8, bisaKanan: sisaKanan > 8 });
  }, []);

  useEffect(() => {
    const trek = trekRef.current;
    if (!trek) return;
    ukur();
    trek.addEventListener("scroll", ukur, { passive: true });
    const observer = new ResizeObserver(ukur);
    observer.observe(trek);
    return () => {
      trek.removeEventListener("scroll", ukur);
      observer.disconnect();
    };
  }, [ukur, kartu.length, hrefSemua, funFakta?.length]);

  /**
   * Geser satu kartu (termasuk jaraknya) per klik.
   * `scrollTo({ behavior: "smooth" })` dipakai lebih dulu; kalau setelah satu
   * frame posisinya belum bergerak sama sekali (smooth scroll dimatikan, atau
   * bentrok dengan scroll-snap), posisinya diset langsung supaya tombol tetap
   * berfungsi di semua kondisi.
   */
  const geser = (arah: 1 | -1) => {
    const trek = trekRef.current;
    if (!trek) return;

    const kartuPertama = trek.firstElementChild as HTMLElement | null;
    const jarak = parseFloat(getComputedStyle(trek).columnGap) || 12;
    const langkah = kartuPertama
      ? kartuPertama.getBoundingClientRect().width + jarak
      : trek.clientWidth * 0.8;

    const maks = trek.scrollWidth - trek.clientWidth;
    const mulai = trek.scrollLeft;
    const tujuan = Math.max(0, Math.min(maks, mulai + arah * langkah));
    if (Math.abs(tujuan - mulai) < 1) return;

    const halus = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (halus) trek.scrollTo({ left: tujuan, behavior: "smooth" });
    else trek.scrollLeft = tujuan;

    // Jaring pengaman: kalau smooth scroll tidak menggerakkan apa pun, lompat.
    setTimeout(() => {
      if (Math.abs(trek.scrollLeft - mulai) < 1) trek.scrollLeft = tujuan;
      ukur();
    }, 120);
    // Event scroll terakhir dari animasi smooth kadang tidak sampai,
    // jadi status panah diukur ulang setelah animasi selesai.
    setTimeout(ukur, 500);
  };

  const adaPanah = posisi.bisaKiri || posisi.bisaKanan;

  return (
    <div className={styles.wadah}>
      <ul ref={trekRef} className={styles.trek}>
        {kartu.map((s) =>
          s.lebar === 2 ? (
            // Kartu lebar: teks ditumpuk di atas gambar supaya kartunya tidak
            // ikut memanjang seperti kartu biasa (gambar + teks bertingkat).
            <li key={s.judul} className={`${styles.item} ${styles.item2}`}>
              <Link href={s.href} className={`${kartuStyles.kartu} ${styles.kartuGambar}`}>
                {/* Tanpa gambar, latar gelap kartu sudah cukup — tulisan
                    placeholder justru bertabrakan dengan teks di atasnya. */}
                <div className={styles.latar}>
                  {s.gambar && (
                    <Image src={s.gambar} alt="" fill sizes="(min-width: 640px) 44rem, 78vw" />
                  )}
                </div>
                <div className={styles.isiGambar}>
                  {s.label && <span className={styles.labelGambar}>{s.label}</span>}
                  <h4 className={styles.judulGambar}>{s.judul}</h4>
                  {s.teks && <p className={styles.teksGambar}>{s.teks}</p>}
                </div>
              </Link>
            </li>
          ) : (
            <li key={s.judul} className={styles.item}>
              {/* Isi kartu memakai gaya kartu rekam jejak supaya formatnya sama;
                  Sorotan hanya mengatur lebar & snap tiap kartu di trek. */}
              <div className={kartuStyles.kartu}>
                <div className={kartuStyles.gambarKartu}>
                  {s.gambar ? (
                    <Image src={s.gambar} alt="" fill sizes="(min-width: 640px) 22rem, 78vw" />
                  ) : (
                    <span aria-hidden="true">Gambar</span>
                  )}
                </div>
                {s.label && <span className={kartuStyles.nomor}>{s.label}</span>}
                <h4 className={`${kartuStyles.namaKartu} ${styles.judulKartu}`}>{s.judul}</h4>
                {s.teks && <p className={kartuStyles.ringkasan}>{s.teks}</p>}
                <p className={kartuStyles.status}>
                  <Link href={s.href} className={kartuStyles.tautanKartu}>
                    Baca selengkapnya <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            </li>
          )
        )}

        {/* Kartu penutup: fun fact kalau ada, kalau tidak tautan ke rekam jejak. */}
        {funFakta?.length ? (
          <li className={styles.item}>
            <div className={`${kartuStyles.kartu} ${styles.kartuFakta}`}>
              <span className={kartuStyles.nomor}>Fun fact</span>
              <FunFakta fakta={funFakta} baris={4} />
            </div>
          </li>
        ) : (
          hrefSemua && (
            <li className={styles.item}>
              <Link href={hrefSemua} className={`${kartuStyles.kartu} ${styles.kartuSemua}`}>
                <span className={kartuStyles.nomor}>{label}</span>
                <span className={styles.judulSemua}>
                  Lihat seluruh rekam jejak <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          )
        )}
      </ul>

      {adaPanah && (
        <div className={styles.panah}>
          <button
            type="button"
            className={styles.tombolPanah}
            onClick={() => geser(-1)}
            disabled={!posisi.bisaKiri}
            aria-label={`Sorotan sebelumnya — ${label}`}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={styles.tombolPanah}
            onClick={() => geser(1)}
            disabled={!posisi.bisaKanan}
            aria-label={`Sorotan berikutnya — ${label}`}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
