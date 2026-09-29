import { Kepala } from "./Kepala";
import { Tombol } from "./Tombol";
import { IkonPengembangan } from "./Ikon3D";
import { site } from "@/config/site";
import styles from "./SedangDikembangkan.module.css";

/**
 * Halaman untuk 404 dan galat, memakai tata letak yang sama dengan
 * SedangDikembangkan. `aksiUlang` (opsional) menambah tombol "Coba lagi".
 */
export function HalamanGalat({
  label,
  judul,
  teks,
  aksiUlang,
}: {
  label: string;
  judul: string;
  teks: string;
  aksiUlang?: React.ReactNode;
}) {
  return (
    <>
      <Kepala />
      <main className={`wadah ${styles.halaman}`}>
        <IkonPengembangan className={styles.ikon} />
        <p className="label">{label}</p>
        <h1 className={styles.judul}>{judul}</h1>
        <p className={styles.teks}>{teks}</p>
        <div className={styles.aksi}>
          {aksiUlang}
          <Tombol href="/">Kembali ke beranda</Tombol>
          <Tombol href={`/${site.tautan.ngobrol}`} varian="garis">
            Ayo ngobrol <span aria-hidden="true">→</span>
          </Tombol>
        </div>
      </main>
    </>
  );
}
