"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import styles from "./Kepala.module.css";

const menu = [
  { label: "Beranda", href: "/" },
  { label: "Rekam Jejak", href: site.tautan.rekamJejak },
  { label: "Pembelajaran", href: site.tautan.pembelajaran },
];

export function Kepala() {
  const pathname = usePathname();
  // Menu hamburger hanya dipakai di layar sempit
  const [terbuka, setTerbuka] = useState(false);

  // Tulisan satuan tetap menandai menu Pembelajaran sebagai aktif
  const aktif = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href) || (href === site.tautan.pembelajaran && pathname.startsWith("/tulisan"));

  // Tutup dengan tombol Escape
  useEffect(() => {
    if (!terbuka) return;
    const tutup = (e: KeyboardEvent) => e.key === "Escape" && setTerbuka(false);
    window.addEventListener("keydown", tutup);
    return () => window.removeEventListener("keydown", tutup);
  }, [terbuka]);

  return (
    <header className={styles.kepala}>
      <div className={`wadah ${styles.isi}`}>
        <Link href="/" className={styles.nama} onClick={() => setTerbuka(false)}>
          {site.nama}
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          aria-expanded={terbuka}
          aria-controls="navigasi-utama"
          aria-label={terbuka ? "Tutup menu" : "Buka menu"}
          onClick={() => setTerbuka((t) => !t)}
        >
          <span aria-hidden="true" />
        </button>

        <nav
          id="navigasi-utama"
          className={styles.nav}
          aria-label="Navigasi utama"
          data-terbuka={terbuka}
        >
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={styles.tautan}
              aria-current={aktif(m.href) ? "page" : undefined}
              onClick={() => setTerbuka(false)}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
