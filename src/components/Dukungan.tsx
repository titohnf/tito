"use client";

import { useJumlahDukungan } from "@/lib/dukungan";
import styles from "./Dukungan.module.css";

const formatAngka = new Intl.NumberFormat("id-ID");

/** Jumlah pengunjung yang mendukung dengan mencoblos foto di hero. */
export function Dukungan() {
  const jumlah = useJumlahDukungan();

  return (
    <p className={styles.dukungan}>
      Didukung oleh{" "}
      <strong className={styles.jumlah} aria-live="polite">
        {jumlah === null ? "…" : formatAngka.format(jumlah)}
      </strong>{" "}
      rakyat
      <span className={styles.petunjuk}>klik foto untuk mendukung</span>
    </p>
  );
}
