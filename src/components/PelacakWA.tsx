"use client";

import { useEffect } from "react";

/** Nama pendek untuk tempat klik: id segmen, aria-labelledby, atau nama tag. */
const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

function lokasiKlik(a: HTMLAnchorElement) {
  const eksplisit = a.closest<HTMLElement>("[data-lokasi]")?.dataset.lokasi;
  if (eksplisit) return slug(eksplisit);

  const wadah = a.closest<HTMLElement>("dialog, section, aside, footer, header");
  if (!wadah) return "lainnya";
  // Tombol di pop up layanan: pakai judul pop up-nya, biar ketahuan layanan mana.
  if (wadah.tagName === "DIALOG") {
    return slug(`dialog ${wadah.querySelector("h2")?.textContent ?? ""}`);
  }
  return slug(wadah.id || wadah.getAttribute("aria-labelledby") || wadah.tagName);
}

/**
 * Mencatat klik ke tautan WhatsApp (wa.me) di mana pun di situs, tanpa
 * menyentuh tiap tombolnya: satu pendengar klik di tingkat dokumen. Yang
 * dicatat cuma tempat klik + halaman + hitungannya (lihat /api/klik), tanpa
 * data pengunjung. Tujuannya satu: tahu tombol mana yang benar-benar dipakai.
 */
export function PelacakWA() {
  useEffect(() => {
    const saatKlik = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (!a) return;
      const isi = JSON.stringify({ lokasi: lokasiKlik(a), halaman: window.location.pathname });
      // sendBeacon tetap terkirim walau halaman langsung berpindah/tab baru terbuka.
      if (!navigator.sendBeacon?.("/api/klik", new Blob([isi], { type: "application/json" }))) {
        fetch("/api/klik", { method: "POST", body: isi, keepalive: true }).catch(() => {});
      }
    };
    document.addEventListener("click", saatKlik, true);
    return () => document.removeEventListener("click", saatKlik, true);
  }, []);

  return null;
}
