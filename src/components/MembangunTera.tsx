import Link from "next/link";
import { membangunTera } from "@/content/profil";
import { site } from "@/config/site";
import { KerangkaLayar } from "./KerangkaLayar";
import styles from "./MembangunTera.module.css";

export function MembangunTera() {
  return (
    <article id="membangun-tera" className={styles.tera} aria-labelledby="tera-judul">
      <div className={styles.teks}>
        <p className={styles.label}>{membangunTera.label}</p>
        <h3 id="tera-judul" className={styles.judul}>
          {membangunTera.judul}
        </h3>
        <p className={styles.paragraf}>{membangunTera.paragraf}</p>
        <Link href={site.tautan.tera} className={styles.tombol}>
          {membangunTera.tombol} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={styles.visual}>
        {membangunTera.gambar ? (
          <img src={membangunTera.gambar} alt="Tampilan sistem yang dibangun untuk Tera" loading="lazy" />
        ) : (
          <KerangkaLayar />
        )}
      </div>
    </article>
  );
}
