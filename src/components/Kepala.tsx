"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import styles from "./Kepala.module.css";

const menu = [
  { label: "Beranda", href: "/" },
  // Tautan ke segmen di beranda: <a> biasa supaya langsung melompat, juga dari halaman lain.
  { label: "Studi Kasus", href: "/#studi-kasus", segmen: true },
  { label: "Tentang", href: "/#tentang", segmen: true },
  { label: "Kolaborasi", href: `/${site.tautan.ngobrol}`, segmen: true },
];

export function Kepala() {
  const pathname = usePathname();
  // Menu hamburger hanya dipakai di layar sempit
  const [terbuka, setTerbuka] = useState(false);
  // Header transparan di puncak halaman; begitu digulir (mulai menempel di atas
  // konten) latarnya jadi kaca buram.
  const [menempel, setMenempel] = useState(false);

  useEffect(() => {
    const perbarui = () => {
      setMenempel(window.scrollY > 8);
    };
    perbarui();
    window.addEventListener("scroll", perbarui, { passive: true });
    return () => window.removeEventListener("scroll", perbarui);
  }, []);

  const aktif = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  // Sudah di beranda tapi tidak di puncak (mis. di "/#ngobrol"): <Link href="/">
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
            if ("segmen" in m && m.segmen) {
              return (
                <a key={m.href} href={m.href} {...props}>
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
