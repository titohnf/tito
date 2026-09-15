"use client";

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
  // Tulisan satuan tetap menandai menu Pembelajaran sebagai aktif
  const aktif = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href) || (href === site.tautan.pembelajaran && pathname.startsWith("/tulisan"));

  return (
    <header className={styles.kepala}>
      <div className={`wadah ${styles.isi}`}>
        <Link href="/" className={styles.nama}>
          {site.nama}
        </Link>
        <nav className={styles.nav} aria-label="Navigasi utama">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={styles.tautan}
              aria-current={aktif(m.href) ? "page" : undefined}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
