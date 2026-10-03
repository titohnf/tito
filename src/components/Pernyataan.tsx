import { Lightbulb, ShieldCheck } from "lucide-react";
import { pernyataan } from "@/content/profil";
import styles from "./Pernyataan.module.css";

const ikon = {
  ide: Lightbulb,
  jaminan: ShieldCheck,
} as const;

/** Satu kalimat besar di bawah hero yang merangkum cara kerja, dengan ikon kecil di sela kata. */
export function Pernyataan() {
  return (
    <section
      className={`wadah ${styles.pernyataan}`}
      aria-labelledby="pernyataan-judul"
    >
      <p className={styles.label}>{pernyataan.label}</p>
      <h2 id="pernyataan-judul" className={styles.kalimat}>
        {pernyataan.potongan.map((p, i) => {
          if (typeof p === "string") return <span key={i}>{p} </span>;
          const Ikon = ikon[p.ikon];
          return (
            <span key={i}>
              <span
                className={`${styles.chip} ${styles[p.ikon]}`}
                aria-hidden="true"
              >
                <Ikon strokeWidth={1.75} />
              </span>{" "}
            </span>
          );
        })}
      </h2>
      <p className={styles.isi}>{pernyataan.paragraf}</p>
    </section>
  );
}
