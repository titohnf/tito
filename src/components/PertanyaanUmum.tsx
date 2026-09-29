import { faqTampil } from "@/content/faq";
import styles from "./PertanyaanUmum.module.css";

/** Pertanyaan yang sering muncul — hanya yang sudah punya jawaban yang tampil. */
export function PertanyaanUmum() {
  const daftar = faqTampil();
  if (daftar.length === 0) return null;

  return (
    <section className={styles.segmen} aria-labelledby="faq-judul">
      <div className="wadah">
        <h2 id="faq-judul" className={styles.judul}>
          Pertanyaan yang sering muncul
        </h2>

        <dl className={styles.daftar}>
          {daftar.map((f) => (
            <div key={f.pertanyaan} className={styles.item}>
              <dt className={styles.pertanyaan}>{f.pertanyaan}</dt>
              <dd className={styles.jawaban}>{f.jawaban}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
