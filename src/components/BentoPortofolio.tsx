"use client";

import { useEffect, useRef } from "react";
import styles from "./Portofolio.module.css";

/**
 * Grid bento kartu portofolio. Awalnya semua video diam (bingkai pertama/poster).
 * Kartu menjadi aktif (`data-aktif`, videonya diputar) saat di-hover, difokus, atau
 * disentuh, dan hanya satu kartu aktif sekali waktu. Kartu yang tidak aktif kembali
 * ke bingkai pertama dan jeda dari pengunjung (`data-dijeda`) dilupakan. Tidak ada
 * pemutaran otomatis kalau pengunjung minta gerakan dikurangi.
 */
export function BentoPortofolio({ children }: { children: React.ReactNode }) {
  const daftarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const daftar = daftarRef.current;
    if (!daftar) return;
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nonaktifkan = (k: HTMLElement) => {
      delete k.dataset.aktif;
      const v = k.querySelector<HTMLVideoElement>("video");
      if (!v) return;
      v.pause();
      if (v.currentTime > 0) v.currentTime = 0;
      delete v.dataset.dijeda;
    };

    const aktifkan = (k: HTMLElement) => {
      daftar.querySelectorAll<HTMLElement>("[data-aktif]").forEach((lain) => {
        if (lain !== k) nonaktifkan(lain);
      });
      k.dataset.aktif = "1";
      const v = k.querySelector<HTMLVideoElement>("video");
      if (v && !kurangiGerak && !v.dataset.dijeda) v.play().catch(() => {});
    };

    const kartuDari = (e: Event) => (e.target as HTMLElement).closest<HTMLElement>("ul > li");
    const masuk = (e: PointerEvent | FocusEvent) => {
      const k = kartuDari(e);
      if (k && k.parentElement === daftar) aktifkan(k);
    };
    const keluar = (e: PointerEvent | FocusEvent) => {
      const k = kartuDari(e);
      if (k && k.parentElement === daftar && !k.contains(e.relatedTarget as Node | null)) nonaktifkan(k);
    };
    // Layar sentuh tidak punya "keluar": kartu aktif sampai kartu lain disentuh.
    const sentuh = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      masuk(e);
    };
    const hoverMasuk = (e: PointerEvent) => {
      if (e.pointerType === "mouse") masuk(e);
    };
    const hoverKeluar = (e: PointerEvent) => {
      if (e.pointerType === "mouse") keluar(e);
    };

    daftar.addEventListener("pointerover", hoverMasuk);
    daftar.addEventListener("pointerout", hoverKeluar);
    daftar.addEventListener("pointerdown", sentuh);
    daftar.addEventListener("focusin", masuk);
    daftar.addEventListener("focusout", keluar);
    return () => {
      daftar.removeEventListener("pointerover", hoverMasuk);
      daftar.removeEventListener("pointerout", hoverKeluar);
      daftar.removeEventListener("pointerdown", sentuh);
      daftar.removeEventListener("focusin", masuk);
      daftar.removeEventListener("focusout", keluar);
    };
  }, []);

  return (
    <ul ref={daftarRef} className={styles.bento}>
      {children}
    </ul>
  );
}
