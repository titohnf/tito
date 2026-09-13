import Link from "next/link";
import { site } from "@/config/site";
import styles from "./Kepala.module.css";

export function Kepala() {
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
          <Link href="/#tentang" className={styles.tautan}>
            Tentang
          </Link>
          <Link href="/#pikiran" className={styles.tautan}>
            Pikiran
          </Link>
          <Link href="/#ngobrol" className={styles.ngobrol}>
            Ngobrol
          </Link>
        </nav>
      </div>
    </header>
  );
}
