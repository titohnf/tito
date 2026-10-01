"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Portofolio.module.css";

/** Bagian kartu yang harus terlihat di layar supaya dihitung sebagai kandidat kartu aktif. */
const BATAS_TERLIHAT = 0.6;

/**
 * Baris kartu yang bisa digeser: semua kartu berderet, yang di kanan boleh
 * terpotong tepi layar sebagai petunjuk masih ada lanjutannya.
 *
 * Hanya satu video yang diputar sekali waktu, yaitu di kartu aktif. Urutan
 * penentuannya:
 *  1. kartu yang sedang di-hover;
 *  2. kartu yang dipilih lewat panah (satu klik = satu kartu, dengan jarak
 *     geser yang dibagi rata supaya kartu terakhir tepat berhenti di ujung).
 *     Pilihan ini dilepas begitu pengunjung menggeser sendiri (roda,
 *     trackpad, sentuh);
 *  3. kalau barisnya sudah mentok di kanan, kartu terakhir;
 *  4. selain itu, kartu paling kiri yang cukup terlihat.
 * Kartu yang tidak aktif kembali ke keadaan awal: video berhenti dan kembali
 * ke bingkai pertama (poster), dan jeda dari pengunjung ikut dilupakan.
 * Seluruh video berhenti kalau barisnya keluar layar, dan tidak pernah
 * diputar otomatis kalau pengunjung minta gerakan dikurangi.
 */
export function GeseranPortofolio({ children }: { children: React.ReactNode }) {
  const jalurRef = useRef<HTMLUListElement>(null);
  const hoverRef = useRef<number | null>(null);
  const pilihRef = useRef<number | null>(null);
  const terlihatRef = useRef(true);
  const [aktif, setAktif] = useState(0);
  const [jumlah, setJumlah] = useState(0);

  // Kartu aktif tanpa memperhitungkan hover (dipakai juga oleh panah).
  const hitungAktif = useCallback(() => {
    const j = jalurRef.current;
    if (!j) return 0;
    const kartu = Array.from(j.children) as HTMLElement[];
    if (pilihRef.current !== null) return Math.min(pilihRef.current, kartu.length - 1);
    if (j.scrollLeft + j.clientWidth >= j.scrollWidth - 4 && j.scrollLeft > 4) return kartu.length - 1;
    const i = kartu.findIndex((k) => {
      const r = k.getBoundingClientRect();
      const lihat = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0);
      return lihat / r.width >= BATAS_TERLIHAT;
    });
    return i < 0 ? 0 : i;
  }, []);

  // Putar video kartu aktif saja; yang lain kembali ke keadaan awal.
  const terapkan = useCallback(() => {
    const j = jalurRef.current;
    if (!j) return;
    const kartu = Array.from(j.children) as HTMLElement[];
    const dasar = hitungAktif();
    const idx = hoverRef.current ?? dasar;
    setAktif(dasar);
    setJumlah(kartu.length);
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    kartu.forEach((k, i) => {
      // Penanda kartu aktif untuk CSS (bayangan lebih tegas), lepas dari ada/tidaknya video.
      if (i === idx && terlihatRef.current) k.dataset.aktif = "1";
      else delete k.dataset.aktif;
      const v = k.querySelector<HTMLVideoElement>("button video");
      if (!v) return;
      if (i === idx && terlihatRef.current) {
        if (!kurangiGerak && !v.dataset.dijeda) v.play().catch(() => {});
      } else {
        v.pause();
        if (v.currentTime > 0) v.currentTime = 0;
        delete v.dataset.dijeda;
      }
    });
  }, [hitungAktif]);

  useEffect(() => {
    const j = jalurRef.current;
    if (!j) return;
    terapkan();
    const pengamat = new IntersectionObserver(([e]) => {
      terlihatRef.current = e.isIntersecting;
      terapkan();
    });
    pengamat.observe(j);
    window.addEventListener("resize", terapkan);
    return () => {
      pengamat.disconnect();
      window.removeEventListener("resize", terapkan);
    };
  }, [terapkan]);

  const indeksKartu = (el: EventTarget | null) => {
    const j = jalurRef.current;
    const li = (el as HTMLElement | null)?.closest?.("ul > li");
    return j && li ? Array.from(j.children).indexOf(li) : -1;
  };

  // Satu klik panah = pindah satu kartu, dan kartu itu yang jadi aktif.
  // Jarak geser total dibagi rata ke (jumlah kartu - 1) langkah, jadi tiap
  // klik menggeser sama jauh dan klik terakhir tepat berhenti di ujung
  // kanan (kartu terakhir sejajar dengan tepi kolom). Kalau langkahnya
  // "selebar satu kartu", barisnya bisa sudah mentok sebelum kartu terakhir
  // dan klik terakhir tidak menggeser apa-apa.
  const geser = (arah: 1 | -1) => {
    const j = jalurRef.current;
    if (!j) return;
    const n = j.children.length;
    if (n < 2) return;
    const tujuan = Math.max(0, Math.min(n - 1, hitungAktif() + arah));
    pilihRef.current = tujuan;
    if (window.matchMedia("(max-width: 639px)").matches) {
      // Layar sempit: kartu tujuan dibawa ke tengah layar.
      const r = (j.children[tujuan] as HTMLElement).getBoundingClientRect();
      j.scrollBy({ left: r.left + r.width / 2 - window.innerWidth / 2, behavior: "smooth" });
    } else {
      const maks = j.scrollWidth - j.clientWidth;
      j.scrollTo({ left: (tujuan / (n - 1)) * maks, behavior: "smooth" });
    }
    terapkan();
  };

  // Menggeser sendiri (roda/trackpad/sentuh) melepas pilihan dari panah.
  const lepasPilihan = () => {
    pilihRef.current = null;
  };

  return (
    <div className={styles.geseran}>
      <ul
        ref={jalurRef}
        className={styles.jalur}
        onScroll={terapkan}
        onWheel={lepasPilihan}
        onTouchStart={lepasPilihan}
        onPointerOver={(e) => {
          const i = indeksKartu(e.target);
          if (i >= 0 && i !== hoverRef.current) {
            hoverRef.current = i;
            terapkan();
          }
        }}
        onPointerLeave={() => {
          hoverRef.current = null;
          terapkan();
        }}
      >
        {children}
      </ul>
      <div className={styles.panah}>
        <button
          type="button"
          className={styles.tombolPanah}
          onClick={() => geser(-1)}
          disabled={aktif <= 0}
          aria-label="Sebelumnya"
        >
          <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.tombolPanah}
          onClick={() => geser(1)}
          disabled={aktif >= jumlah - 1}
          aria-label="Berikutnya"
        >
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
