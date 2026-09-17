import Link from "next/link";
import { Kepala } from "./Kepala";
import { Kaki } from "./Kaki";
import styles from "./HalamanSederhana.module.css";

/** Kerangka untuk halaman terpisah (placeholder, tulisan, dsb.) */
export function HalamanSederhana({
  label,
  judul,
  lebar = false,
  kembali = true,
  children,
}: {
  label?: string;
  judul: string;
  lebar?: boolean;
  /**
   * Tautan kembali di atas judul. `false` mematikannya (untuk halaman yang sudah
   * ada di menu), objek untuk mengarahkan ke halaman lain.
   */
  kembali?: boolean | { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <Kepala />
      <main className={`wadah ${styles.halaman}`}>
        {kembali && (
          <Link
            href={typeof kembali === "object" ? kembali.href : "/"}
            className={styles.kembali}
          >
            <span aria-hidden="true">←</span>{" "}
            {typeof kembali === "object" ? kembali.label : "Kembali ke beranda"}
          </Link>
        )}
        {label && <p className="label">{label}</p>}
        <h1 className={styles.judul}>{judul}</h1>
        <div className={`${styles.isi} ${lebar ? styles.isiLebar : ""}`}>{children}</div>
      </main>
      <Kaki />
    </>
  );
}
