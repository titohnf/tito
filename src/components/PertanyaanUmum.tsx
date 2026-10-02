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

  const dataTerstruktur = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: daftar.map((f) => ({
      "@type": "Question",
      name: f.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: f.jawaban },
    })),
  };

  return (
    <section className={styles.segmen} aria-labelledby="faq-judul">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dataTerstruktur).replace(/</g, "\\u003c"),
        }}
      />
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
