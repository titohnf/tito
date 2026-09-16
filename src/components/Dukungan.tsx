"use client";

import { useJumlahDukungan, useSudahDukung } from "@/lib/dukungan";
import styles from "./Dukungan.module.css";

const formatAngka = new Intl.NumberFormat("id-ID");

/** Penghitung dukungan: pil jempol yang menggantung di tepi bawah foto hero. */
export function Dukungan() {
  const jumlah = useJumlahDukungan();
  const sudahDukung = useSudahDukung();
  // Sudah mendukung: pendukung lain = total dikurangi dirinya sendiri
  const lain = jumlah === null ? null : Math.max(0, jumlah - 1);

  return (
    <p className={styles.dukungan} data-didukung={sudahDukung} aria-live="polite">
      <span className={styles.jempol} aria-hidden="true">
        👍
      </span>
      {sudahDukung ? (
        lain === 0 ? (
          <>Didukung kamu</>
        ) : (
          <>
            Didukung kamu dan{" "}
            <strong className={styles.jumlah}>
              {lain === null ? "…" : formatAngka.format(lain)}
            </strong>{" "}
            lainnya
          </>
        )
      ) : (
        <strong className={styles.jumlah}>
          {jumlah === null ? "…" : formatAngka.format(jumlah)}
        </strong>
      )}
    </p>
  );
}
