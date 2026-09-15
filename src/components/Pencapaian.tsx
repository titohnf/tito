import { pencapaian, tanggalLahir } from "@/content/profil";
import { UsiaBerjalan } from "./UsiaBerjalan";
import styles from "./Pencapaian.module.css";

/** Deretan data pencapaian di bawah hero, diawali usia yang terus berjalan. */
export function Pencapaian() {
  return (
    <section className={`wadah ${styles.pencapaian}`} aria-label="Pencapaian">
      <ul className={styles.daftar}>
        <li className={`${styles.item} ${styles.usia}`}>
          <span className={styles.kelompok}>Usia</span>
          <span className={styles.angka}>
            <UsiaBerjalan tanggalLahir={tanggalLahir} />
          </span>
          <span className={styles.keterangan}>tahun dan terus bertambah</span>
        </li>

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
