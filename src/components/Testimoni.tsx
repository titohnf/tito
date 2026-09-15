import { testimoni } from "@/content/testimoni";
import styles from "./Testimoni.module.css";

/** Tersembunyi otomatis selama belum ada testimoni di src/content/testimoni.ts */
export function Testimoni() {
  if (testimoni.length === 0) return null;

  return (
    <section className={`wadah ${styles.testimoni}`} aria-labelledby="testimoni-judul">
      <h2 id="testimoni-judul" className="label">
        Kata mereka
      </h2>
      <ul className={styles.grid}>
        {testimoni.map((t) => (
          <li key={t.nama}>
            <figure className={styles.kartu}>
              <blockquote className={styles.kutipan}>“{t.kutipan}”</blockquote>
              <figcaption className={styles.orang}>
                <span className={styles.nama}>{t.nama}</span>
                <span className={styles.peran}>{t.peran}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
