import { pencapaian } from "@/content/profil";
import styles from "./Pencapaian.module.css";

/** Deretan data pencapaian di bawah hero. */
export function Pencapaian() {
  return (
    <section className={`wadah ${styles.pencapaian}`} aria-label="Pencapaian">
      <ul className={styles.daftar}>
        {pencapaian.map((d) => {
          // Tanda "+" dibuat lebih pudar supaya angkanya yang menonjol
          const plus = d.angka.endsWith("+");
          return (
            <li key={d.keterangan} className={styles.item}>
              <span className={styles.kelompok}>{d.kelompok}</span>
              <span className={styles.angka}>
                {plus ? d.angka.slice(0, -1) : d.angka}
                {plus && <span className={styles.plus}>+</span>}
              </span>
              <span className={styles.keterangan}>{d.keterangan}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
