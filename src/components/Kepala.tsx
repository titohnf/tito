import Link from "next/link";
import { site } from "@/config/site";
import styles from "./Kepala.module.css";

export function Kepala({ dasar = "/" }: { dasar?: string }) {
  return (
    <header className={styles.kepala}>
      <div className={`wadah ${styles.isi}`}>
        <div className={styles.identitas}>
          <Link href="/" className={styles.nama}>
            {site.nama}
          </Link>
          <span className={styles.status}>
            <span className={styles.titik} aria-hidden="true" />
            Terbuka untuk diskusi
          </span>
        </div>
        <nav className={styles.nav} aria-label="Navigasi utama">
          <Link href={`${dasar}#tentang`} className={styles.tautan}>
            Tentang
          </Link>
          <Link href={`${dasar}#pikiran`} className={styles.tautan}>
            Pikiran
          </Link>
          <Link href={`${dasar}#ngobrol`} className={styles.ngobrol}>
            Ngobrol
          </Link>
        </nav>
      </div>
    </header>
  );
}
