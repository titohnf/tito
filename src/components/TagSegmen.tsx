import type { Segmen } from "@/content/segmen";
import { labelSegmen, labelSegmenPanjang } from "@/content/segmen";
import styles from "./TagSegmen.module.css";

/** Deretan tag peran (Perwakilan / Pelayan / Pendamping) untuk kartu konten & rekam jejak. */
export function TagSegmen({ segmen, panjang }: { segmen?: Segmen[]; panjang?: boolean }) {
  if (!segmen?.length) return null;
  return (
    <ul className={styles.daftar}>
      {segmen.map((s) => (
        <li key={s} className={`${styles.tag} ${styles[s]}`}>
          {panjang ? labelSegmenPanjang[s] : labelSegmen[s]}
        </li>
      ))}
    </ul>
  );
}
