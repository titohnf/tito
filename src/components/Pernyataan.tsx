import { pernyataan } from "@/content/profil";
import { kartuPemerintahan } from "@/content/portofolio";
import { Portofolio } from "./Portofolio";
import styles from "./Pernyataan.module.css";

/** Segmen "Studi kasus" di bawah hero: label kecil, judul, lalu bento studi kasusnya. */
export function Pernyataan() {
  return (
    <section id="studi-kasus" className={styles.studi} aria-labelledby="pernyataan-judul">
      <div className="wadah">
        <p className={styles.label}>{pernyataan.judul}</p>
        <h2 id="pernyataan-judul" className={styles.judul}>
          {pernyataan.subjudul}
        </h2>
        <Portofolio />

        <div className={styles.pemerintahan}>
          <h3 className={styles.judulSub}>{pernyataan.pemerintahan.judul}</h3>
        </div>
        <Portofolio kartu={kartuPemerintahan} />
      </div>
    </section>
  );
}
