"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Segmen } from "@/content/segmen";
import { daftarSegmen, labelSegmen } from "@/content/segmen";
import styles from "./TabSegmen.module.css";

export type PilihanSegmen = Segmen | "semua";

/**
 * Tab penyaring peran untuk /rekam-jejak dan /pembelajaran.
 * Segmen tanpa isi tetap bisa dibuka — halaman menampilkan empty state.
 */
export function TabSegmen({
  aktif,
  onPilih,
  jumlah,
}: {
  aktif: PilihanSegmen;
  onPilih: (p: PilihanSegmen) => void;
  jumlah: Record<PilihanSegmen, number>;
}) {
  const tab: { id: PilihanSegmen; label: string }[] = [
    { id: "semua", label: "Semua" },
    ...daftarSegmen.map((s) => ({ id: s as PilihanSegmen, label: labelSegmen[s] })),
  ];

  return (
    <div className={styles.tab} role="group" aria-label="Saring menurut peran">
      {tab.map((t) => (
        <button
          key={t.id}
          type="button"
          className={styles.chip}
          aria-pressed={aktif === t.id}
          onClick={() => onPilih(t.id)}
        >
          {t.label}
          <span className={styles.jumlah}>{jumlah[t.id]}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * State tab yang tersinkron dengan `?peran=` di URL: dibaca saat mount (dipakai
 * tombol di segmen About) dan ditulis ulang tiap tab diklik, supaya tampilan
 * hasil saringan bisa disalin/dibagikan.
 *
 * Sengaja membaca `location` alih-alih `useSearchParams` supaya halaman tetap
 * bisa diprerender statis tanpa <Suspense>. Penulisan pakai `replace` + tanpa
 * scroll: riwayat tidak menumpuk dan posisi baca tidak melompat.
 */
export function useTabSegmen() {
  const router = useRouter();
  const pathname = usePathname();
  const [aktif, setAktifState] = useState<PilihanSegmen>("semua");

  useEffect(() => {
    const peran = new URLSearchParams(window.location.search).get("peran");
    if (daftarSegmen.includes(peran as Segmen)) setAktifState(peran as PilihanSegmen);
  }, []);

  const setAktif = useCallback(
    (pilihan: PilihanSegmen) => {
      setAktifState(pilihan);

      const query = new URLSearchParams(window.location.search);
      if (pilihan === "semua") query.delete("peran");
      else query.set("peran", pilihan);

      const sisa = query.toString();
      router.replace(sisa ? `${pathname}?${sisa}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  return [aktif, setAktif] as const;
}

/** Hitung isi tiap tab dari daftar item yang punya field `segmen`. */
export function hitungSegmen<T extends { segmen?: Segmen[] }>(
  items: T[]
): Record<PilihanSegmen, number> {
  const hasil = { semua: items.length } as Record<PilihanSegmen, number>;
  for (const s of daftarSegmen) hasil[s] = items.filter((i) => i.segmen?.includes(s)).length;
  return hasil;
}

/** Saring item menurut tab yang aktif. */
export function saringSegmen<T extends { segmen?: Segmen[] }>(items: T[], aktif: PilihanSegmen) {
  return aktif === "semua" ? items : items.filter((i) => i.segmen?.includes(aktif));
}
