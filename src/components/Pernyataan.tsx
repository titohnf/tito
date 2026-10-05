import { pernyataan } from "@/content/profil";
import { Portofolio } from "./Portofolio";
import styles from "./Pernyataan.module.css";

/** Segmen "Studi kasus" di bawah hero: judul, lalu bento studi kasusnya. */
export function Pernyataan() {
  return (
    <section id="studi-kasus" className={styles.studi} aria-labelledby="pernyataan-judul">
      <div className="wadah">
        <h2 id="pernyataan-judul" className={styles.judul}>
          {pernyataan.judul}
        </h2>
        <p className={styles.subjudul}>{pernyataan.subjudul}</p>
        <Portofolio />
      </div>
    </section>
  );
}
