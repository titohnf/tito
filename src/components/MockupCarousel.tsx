"use client";

import { useEffect, useRef, useState } from "react";
import { mockup } from "@/content/mockup";
import styles from "./MockupCarousel.module.css";

/** Jeda antar pergantian slide otomatis (slide iframe), dalam milidetik. */
const JEDA_OTOMATIS = 5000;

/**
 * Putar video dari awal. `play()` bisa ditolak browser (mis. AbortError saat
 * tab baru saja tersembunyi/muncul), jadi dicoba sekali lagi sebentar kemudian.
 */
function putarDariAwal(v: HTMLVideoElement) {
  v.currentTime = 0;
  v.play().catch(() => {
    setTimeout(() => v.play().catch(() => {}), 200);
  });
}

/**
 * Slide video pindah lewat `onEnded`; ini batas atas menunggunya, cuma jaring
 * pengaman kalau videonya gagal dimuat atau macet.
 */
const BATAS_TUNGGU_VIDEO = 20000;

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
  // Dijeda selama pengunjung menyentuh/di-hover/memfokus carousel. State (bukan
  // cuma ref) supaya timer pindah-slide dijadwalkan ulang begitu jeda berakhir —
  // dulu hanya ref, jadi timer yang habis saat di-hover terlewat dan auto-slide
  // mati selamanya sampai pengunjung menekan tombol.
  const [dijeda, setDijeda] = useState(false);
  const dijedaRef = useRef(false);
  const setJeda = (nilai: boolean) => {
    dijedaRef.current = nilai;
    setDijeda(nilai);
  };
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
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

  // Slide video: hanya yang aktif diputar, selalu dari awal. Kalau pengunjung
  // minta gerakan dikurangi, tidak ada yang diputar (posternya saja).
  useEffect(() => {
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    videoRef.current.forEach((v, i) => {
      if (!v) return;
      if (i === aktif && !kurangiGerak) {
        putarDariAwal(v);
      } else {
        v.pause();
      }
    });
  }, [aktif]);

  // Pindah slide sendiri; timer dimulai ulang tiap kali slide aktif berubah
  // (baik oleh timer ini sendiri maupun interaksi pengunjung), jadi jedanya
  // selalu penuh sejak interaksi terakhir. Slide iframe pindah tiap
  // JEDA_OTOMATIS; slide video menunggu videonya selesai (lihat `selesai`),
  // dan timer di sini hanya jaring pengaman.
  useEffect(() => {
    if (jumlah <= 1 || dijeda) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const jeda = mockup[aktif].video ? BATAS_TUNGGU_VIDEO : JEDA_OTOMATIS;
    const timer = setTimeout(() => setAktif((a) => (a + 1) % jumlah), jeda);
    return () => clearTimeout(timer);
  }, [aktif, jumlah, dijeda]);

  // Video slide aktif selesai: lanjut ke slide berikutnya, atau ulang kalau
  // pengunjung sedang menyentuh/di-hover carousel-nya.
  const selesai = (i: number) => {
    if (i !== aktif) return;
    if (!dijedaRef.current && jumlah > 1) {
      setAktif((a) => (a + 1) % jumlah);
    } else {
      const v = videoRef.current[i];
      if (v) putarDariAwal(v);
    }
  };

  if (jumlah === 0) return null;

  const berhenti = () => setJeda(true);
  const lanjut = () => setJeda(false);

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
                  {m.video ? (
                    <video
                      ref={(el) => {
                        videoRef.current[i] = el;
                      }}
                      className={styles.video}
                      src={m.video}
                      poster={m.poster}
                      muted
                      playsInline
                      preload="metadata"
                      tabIndex={-1}
                      aria-hidden="true"
                      onEnded={() => selesai(i)}
                    />
                  ) : (
                    <div className={styles.previewSkala}>
                      <iframe
                        src={m.href}
                        title={`Pratinjau hero ${m.judul}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.tautan}
                    aria-label={`Kunjungi website ${m.judul}`}
                    onPointerMove={(e) => {
                      // Label "Kunjungi web" menggantikan kursor: posisinya
                      // dilangsung disetel ke elemen (bukan state) supaya
                      // gerakan mouse tidak memicu render ulang carousel.
                      const r = e.currentTarget.getBoundingClientRect();
                      const k = e.currentTarget.style;
                      k.setProperty("--x", `${e.clientX - r.left}px`);
                      k.setProperty("--y", `${e.clientY - r.top}px`);
                    }}
                  >
                    <span className={styles.etiket} aria-hidden="true">
                      Kunjungi web
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
