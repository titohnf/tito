"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Konten, TipeKonten } from "@/content/konten";
import { KartuKonten } from "./KartuKonten";
import styles from "./GridKonten.module.css";

type Filter = "semua" | TipeKonten;

const filters: { id: Filter; label: string; kosong: string }[] = [
  { id: "semua", label: "Semua", kosong: "Belum ada apa-apa di sini. Balik lagi nanti." },
  { id: "tulisan", label: "Tulisan", kosong: "Belum ada tulisan di sini. Balik lagi nanti." },
  { id: "pemikiran", label: "Pemikiran", kosong: "Belum ada pemikiran yang dicatat. Balik lagi nanti." },
  { id: "video", label: "Video", kosong: "Belum ada video di sini. Balik lagi nanti." },
];

export function GridKonten({ items }: { items: Konten[] }) {
  const [aktif, setAktif] = useState<Filter>("semua");

  const tampil = aktif === "semua" ? items : items.filter((k) => k.tipe === aktif);
  const filterAktif = filters.find((f) => f.id === aktif)!;
  const gridRef = useMasonry(tampil.length, aktif);

  return (
    <>
      {items.length > 0 && (
        <div className={styles.filter} role="group" aria-label="Saring konten">
          {filters.map((f) => {
            const jumlah = f.id === "semua" ? items.length : items.filter((k) => k.tipe === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                className={styles.chip}
                aria-pressed={aktif === f.id}
                onClick={() => setAktif(f.id)}
              >
                {f.label}
                <span className={styles.jumlah}>{jumlah}</span>
              </button>
            );
          })}
        </div>
      )}

      {tampil.length === 0 ? (
        <div className={styles.kosong}>
          <span className={styles.kosongIkon} aria-hidden="true">
            (kosong)
          </span>
          <p>{filterAktif.kosong}</p>
        </div>
      ) : (
        <ul ref={gridRef} className={styles.grid}>
          {tampil.map((item) => (
            <li
              key={item.tipe === "tulisan" ? item.slug : item.id}
              className={styles[item.tipe]}
            >
              <KartuKonten item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Hitung berapa baris (unit 4px) yang dibutuhkan tiap kartu, lalu set grid-row span. */
function useMasonry(...deps: unknown[]) {
  const ref = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    const atur = () => {
      const unit = parseFloat(getComputedStyle(grid).gridAutoRows) || 4;
      for (const li of Array.from(grid.children) as HTMLElement[]) {
        li.style.gridRowEnd = `span ${Math.ceil(li.getBoundingClientRect().height / unit)}`;
      }
    };

    // Ukur dulu dalam mode daftar biasa, baru aktifkan masonry
    grid.removeAttribute("data-siap");
    for (const li of Array.from(grid.children) as HTMLElement[]) li.style.gridRowEnd = "";
    grid.setAttribute("data-siap", "");
    atur();

    const observer = new ResizeObserver(atur);
    for (const li of Array.from(grid.children)) observer.observe(li);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
