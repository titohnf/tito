"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import styles from "./Kepala.module.css";

/** id segmen Layanan di beranda, tanpa "#". */
const idLayanan = site.tautan.layanan.slice(1);

const menu = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: `/${site.tautan.layanan}` },
  { label: "Rekam Jejak", href: site.tautan.rekamJejak },
  { label: "Pembelajaran", href: site.tautan.pembelajaran },
];

export function Kepala() {
  const pathname = usePathname();
  // Menu hamburger hanya dipakai di layar sempit
  const [terbuka, setTerbuka] = useState(false);
  // Header transparan di puncak halaman; begitu digulir (mulai menempel di atas
  // konten) latarnya jadi kaca buram.
  const [menempel, setMenempel] = useState(false);

  // Di beranda: apakah segmen Layanan sedang berada di bawah header. Kalau ya,
  // menu "Layanan" yang ditandai aktif, bukan "Beranda".
  const [diLayanan, setDiLayanan] = useState(false);

  useEffect(() => {
    const perbarui = () => {
      setMenempel(window.scrollY > 8);
      const el = pathname === "/" ? document.getElementById(idLayanan) : null;
      if (!el) return setDiLayanan(false);
      const r = el.getBoundingClientRect();
      setDiLayanan(r.top <= 100 && r.bottom > 100);
    };
    perbarui();
    window.addEventListener("scroll", perbarui, { passive: true });
    window.addEventListener("resize", perbarui);
    return () => {
      window.removeEventListener("scroll", perbarui);
      window.removeEventListener("resize", perbarui);
    };
  }, [pathname]);

  // Tulisan satuan tetap menandai menu Pembelajaran sebagai aktif
  const aktif = (href: string) => {
    if (href === "/") return pathname === "/" && !diLayanan;
    if (href === `/${site.tautan.layanan}`) return pathname === "/" && diLayanan;
    return pathname.startsWith(href) || (href === site.tautan.pembelajaran && pathname.startsWith("/tulisan"));
  };

  // Sudah di beranda tapi tidak di puncak (mis. di "/#layanan"): <Link href="/">
  // hanya membuang hash-nya, halamannya tidak ikut kembali ke atas. Jadi
  // digulir sendiri, dan hash-nya dibuang lewat history supaya URL-nya bersih.
  const keAtas = (e: React.MouseEvent) => {
    setTerbuka(false);
    if (pathname !== "/") return;
    e.preventDefault();
    if (window.location.hash) window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Tutup dengan tombol Escape
  useEffect(() => {
    if (!terbuka) return;
    const tutup = (e: KeyboardEvent) => e.key === "Escape" && setTerbuka(false);
    window.addEventListener("keydown", tutup);
    return () => window.removeEventListener("keydown", tutup);
  }, [terbuka]);

  return (
    <header className={styles.kepala} data-menempel={menempel || terbuka}>
      <div className={`wadah ${styles.isi}`}>
        <Link href="/" className={styles.nama} onClick={keAtas}>
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
          {menu.map((m) => {
            const props = {
              className: styles.tautan,
              "aria-current": aktif(m.href) ? ("page" as const) : undefined,
              onClick: m.href === "/" ? keAtas : () => setTerbuka(false),
            };
            // Tujuan berupa bagian di beranda (mis. "/#layanan"). Kalau sudah di
            // beranda, pakai <a> biasa: lewat <Link>, App Router tidak menggulir
            // lagi begitu URL-nya sudah sama, jadi klik kedua (setelah pengunjung
            // menggulir menjauh) tidak berbuat apa-apa. <a href="#..."> selalu
            // menggulir ke bagiannya, sekalipun hash-nya sama.
            if (pathname === "/" && m.href.startsWith("/#")) {
              return (
                <a key={m.href} href={m.href.slice(1)} {...props}>
                  {m.label}
                </a>
              );
            }
            return (
              <Link key={m.href} href={m.href} {...props}>
                {m.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
