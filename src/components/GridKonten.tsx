"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Konten, TipeKonten } from "@/content/konten";
import { KartuKonten } from "./KartuKonten";
import { TabSegmen, hitungSegmen, saringSegmen, useTabSegmen } from "./TabSegmen";
import styles from "./GridKonten.module.css";

type Filter = "semua" | TipeKonten;

const filters: { id: Filter; label: string; kosong: string }[] = [
  { id: "semua", label: "Semua", kosong: "Belum ada konten. Balik lagi nanti, ya." },
  { id: "tulisan", label: "Tulisan", kosong: "Belum ada tulisan. Balik lagi nanti, ya." },
  { id: "pemikiran", label: "Pemikiran", kosong: "Belum ada pemikiran. Balik lagi nanti, ya." },
  { id: "video", label: "Video", kosong: "Belum ada video. Balik lagi nanti, ya." },
];

export function GridKonten({ items: semua, tabSegmen }: { items: Konten[]; tabSegmen?: boolean }) {
  const [aktif, setAktif] = useState<Filter>("semua");
  const jumlahSegmen = useMemo(() => hitungSegmen(semua), [semua]);
  const [segmen, setSegmen] = useTabSegmen();

  // Tab peran (opsional) menyaring dulu, filter jenis konten bekerja di atas hasilnya
  const items = tabSegmen ? saringSegmen(semua, segmen) : semua;

  // Kalau hanya ada satu jenis konten, filter & grid campur tidak diperlukan
  const tipeAda = Array.from(new Set(items.map((k) => k.tipe)));
  const satuTipe = tipeAda.length <= 1;
  const daftarFilter = filters.filter(
    (f) => f.id === "semua" || tipeAda.includes(f.id as TipeKonten)
  );

  // Kalau tab peran menghabiskan jenis yang sedang dipilih, jatuh kembali ke "Semua"
  const jenis = aktif !== "semua" && !tipeAda.includes(aktif) ? "semua" : aktif;

  const tampil = jenis === "semua" ? items : items.filter((k) => k.tipe === jenis);
  const filterAktif = filters.find((f) => f.id === jenis)!;
  const gridRef = useMasonry(!satuTipe, tampil.length, `${jenis}-${segmen}`);

  return (
    <>
      {tabSegmen && (
        <TabSegmen aktif={segmen} onPilih={setSegmen} jumlah={jumlahSegmen} />
      )}

      {!satuTipe && (
        <div className={styles.filter} role="group" aria-label="Saring konten">
          {daftarFilter.map((f) => {
            const jumlah = f.id === "semua" ? items.length : items.filter((k) => k.tipe === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                className={styles.chip}
                aria-pressed={jenis === f.id}
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
        <ul ref={gridRef} className={satuTipe ? styles.gridSederhana : styles.grid}>
          {tampil.map((item) => (
            <li
              key={item.tipe === "tulisan" ? item.slug : item.id}
              className={satuTipe ? undefined : styles[item.tipe]}
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
function useMasonry(aktif: boolean, jumlah: number, filter: string) {
  const ref = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid || !aktif) return;

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
  }, [aktif, jumlah, filter]);

  return ref;
}
