import Link from "next/link";
import { Kepala } from "./Kepala";
import { Kaki } from "./Kaki";
import styles from "./HalamanSederhana.module.css";

/** Kerangka untuk halaman terpisah (placeholder, tulisan, dsb.) */
export function HalamanSederhana({
  label,
  judul,
  children,
}: {
  label: string;
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Kepala />
      <main className={`wadah ${styles.halaman}`}>
        <Link href="/" className={styles.kembali}>
          <span aria-hidden="true">←</span> Kembali ke beranda
        </Link>
        <p className="label">{label}</p>
        <h1 className={styles.judul}>{judul}</h1>
        <div className={styles.isi}>{children}</div>
      </main>
      <Kaki />
    </>
  );
}
