import { faqTampil } from "@/content/faq";
import styles from "./PertanyaanUmum.module.css";

/**
 * Pertanyaan yang sering muncul — hanya yang sudah punya jawaban yang tampil.
 * Akordeon bawaan browser (<details>): jawaban terbuka saat pertanyaannya diklik.
 * Atribut `name` yang sama membuat hanya satu yang terbuka sekaligus. Keyboard
 * dan pembaca layar tetap jalan tanpa JavaScript.
 */
export function PertanyaanUmum() {
  const daftar = faqTampil();
  if (daftar.length === 0) return null;

  return (
    <section className={styles.segmen} aria-labelledby="faq-judul">
      <div className="wadah">
        <h2 id="faq-judul" className={styles.judul}>
          Pertanyaan yang sering muncul
        </h2>

        <div className={styles.daftar}>
          {daftar.map((f) => (
            <details key={f.pertanyaan} name="faq" className={styles.item}>
              <summary className={styles.pertanyaan}>
                <span>{f.pertanyaan}</span>
                <span className={styles.ikon} aria-hidden="true" />
              </summary>
              <p className={styles.jawaban}>{f.jawaban}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
