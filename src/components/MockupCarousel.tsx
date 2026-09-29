"use client";

import { useEffect, useRef, useState } from "react";
import { mockup } from "@/content/mockup";
import styles from "./MockupCarousel.module.css";

/** Jeda antar pergantian slide otomatis, dalam milidetik. */
const JEDA_OTOMATIS = 5000;

/** Lebar acuan iframe pratinjau (setara viewport desktop), sebelum diskalakan turun. */
const LEBAR_ACUAN = 1440;

/**
 * Carousel mockup website yang pernah dibuat, tampil di bawah tombol hero.
 * Kartu aktif selalu besar di tengah; tetangganya (sebelum & sesudah, dihitung
 * melingkar lewat modulo — bukan sekadar indeks-1/indeks+1 — supaya slide
 * pertama & terakhir pun tetap punya dua tetangga) tampil kecil di kiri-kanan.
 * Semua kartu tetap dipasang di DOM sepanjang waktu (cuma posisi & skalanya
 * yang berubah lewat transform), jadi iframe-nya tidak pernah dimuat ulang
 * saat berpindah slide. Berpindah diam ke slide berikutnya tiap
 * JEDA_OTOMATIS, berhenti sementara saat disentuh/di-hover/difokus, dan
 * berhenti total kalau pengunjung minta gerakan dikurangi
 * (prefers-reduced-motion).
 */
export function MockupCarousel() {
  const wadahRef = useRef<HTMLDivElement>(null);
  const bingkaiRef = useRef<HTMLDivElement>(null);
  const [aktif, setAktif] = useState(0);
  const jalanRef = useRef(true);
  const jumlah = mockup.length;

  // Skala iframe pratinjau dihitung dari lebar kartu sebenarnya (bukan CSS
  // murni: calc() tidak bisa mengubah lebar container jadi rasio tak
  // berdimensi untuk transform: scale()), lalu disebar ke semua slide lewat
  // custom property supaya cuma satu observer yang dibutuhkan. clientWidth
  // sama untuk semua kartu (kartu kecil cuma diperkecil lewat transform,
  // bukan lewat lebar layout), jadi cukup amati salah satu saja.
  useEffect(() => {
    const bingkai = bingkaiRef.current;
    const wadah = wadahRef.current;
    if (!bingkai || !wadah) return;
    const perbarui = () => {
      wadah.style.setProperty("--skala", String(bingkai.clientWidth / LEBAR_ACUAN));
    };
    perbarui();
    const observer = new ResizeObserver(perbarui);
    observer.observe(bingkai);
    return () => observer.disconnect();
  }, []);

  // Pindah slide sendiri tiap beberapa detik; timer dimulai ulang tiap kali
  // slide aktif berubah (baik oleh timer ini sendiri maupun interaksi
  // pengunjung), jadi jedanya selalu penuh sejak interaksi terakhir.
  useEffect(() => {
    if (jumlah <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => {
      if (jalanRef.current) setAktif((a) => (a + 1) % jumlah);
    }, JEDA_OTOMATIS);
    return () => clearTimeout(timer);
  }, [aktif, jumlah]);

  if (jumlah === 0) return null;

  const berhenti = () => {
    jalanRef.current = false;
  };
  const lanjut = () => {
    jalanRef.current = true;
  };

  return (
    <div
      ref={wadahRef}
      className={styles.wadah}
      aria-label="Contoh mockup website"
      onPointerEnter={berhenti}
      onPointerLeave={lanjut}
      onFocus={berhenti}
      onBlur={lanjut}
      onTouchStart={berhenti}
      onTouchEnd={lanjut}
    >
      <div className={styles.panggung}>
        {mockup.map((m, i) => {
          // Jarak melingkar terpendek ke slide aktif: -1 = tetangga kiri,
          // 0 = aktif, 1 = tetangga kanan — dihitung lewat modulo supaya
          // slide pertama tetap punya tetangga "kiri" (yaitu slide terakhir)
          // dan sebaliknya, bukan cuma mentok di ujung array.
          let delta = i - aktif;
          if (delta > jumlah / 2) delta -= jumlah;
          if (delta < -jumlah / 2) delta += jumlah;
          const aktifKah = delta === 0;

          return (
            <div
              key={m.id}
              className={styles.item}
              style={{ "--delta": delta, zIndex: aktifKah ? 2 : 1 } as React.CSSProperties}
            >
              <div className={styles.bingkai} data-aktif={aktifKah || undefined} ref={i === 0 ? bingkaiRef : undefined}>
                <span className={styles.bilah} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <div className={styles.layar}>
                  <div className={styles.previewSkala}>
                    <iframe
                      src={m.href}
                      title={`Pratinjau hero ${m.judul}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className={styles.overlay}>
                    <span className={styles.tombolKunjungi}>
                      Kunjungi Website <span aria-hidden="true">→</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {jumlah > 1 && (
        <div className={styles.kontrol}>
          <button
            type="button"
            className={styles.tombolPanah}
            onClick={() => setAktif((aktif - 1 + jumlah) % jumlah)}
            aria-label="Mockup sebelumnya"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className={styles.titik} role="tablist" aria-label="Pilih mockup">
            {mockup.map((m, i) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={i === aktif}
                aria-label={m.judul}
                className={styles.titikTombol}
                data-aktif={i === aktif || undefined}
                onClick={() => setAktif(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.tombolPanah}
            onClick={() => setAktif((aktif + 1) % jumlah)}
            aria-label="Mockup berikutnya"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
