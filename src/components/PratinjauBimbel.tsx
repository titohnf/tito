import { CircleCheck } from "lucide-react";
import styles from "./PratinjauBimbel.module.css";

/**
 * Pratinjau animasi CSS (bukan rekaman beneran) yang mensimulasikan sistem
 * Bimbel Tera bekerja: progres belajar tiap siswa mengisi, lalu status
 * pembayarannya berubah jadi lunas. Placeholder sampai ada rekaman layar
 * sistem yang asli — lihat `pratinjau` di content/portofolio.ts.
 */
export function PratinjauBimbel() {
  return (
    <div className={styles.panel} aria-hidden="true">
      <span className={styles.bilah}>
        <i />
        <i />
        <i />
      </span>

      <div className={styles.baris}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.item} style={{ animationDelay: `${i * 0.6}s` }}>
            <span className={styles.avatar} />
            <span className={styles.nama} />
            <span className={styles.progres}>
              <span className={styles.isi} style={{ animationDelay: `${i * 0.6}s` }} />
            </span>
            <span className={styles.status} style={{ animationDelay: `${i * 0.6}s` }}>
              <CircleCheck size={14} strokeWidth={2.4} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
