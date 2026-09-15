import type { Metadata } from "next";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { laporanKerja } from "@/content/laporan-kerja";
import { site } from "@/config/site";
import styles from "@/components/KartuGrid.module.css";

export const metadata: Metadata = {
  title: "Rekam Jejak",
};

export default function RekamJejak() {
  return (
    <HalamanSederhana judul="Rekam Jejak" lebar>
      <p>Instansi dan tim tempat saya merancang layanan digital.</p>

      <ul className={`${styles.grid} ${styles.grid3}`} style={{ marginTop: "2rem" }}>
        {laporanKerja.map((l, i) => (
          <li key={l.instansi}>
            <div className={styles.kartu}>
              <span className={styles.nomor}>{String(i + 1).padStart(2, "0")}</span>
              <h2 className={styles.namaKartu}>{l.instansi}</h2>
              <p className={styles.sub}>{l.tim}</p>
              {l.ringkasan && <p className={styles.ringkasan}>{l.ringkasan}</p>}
            </div>
          </li>
        ))}
      </ul>

      <div className="aksi">
        <Tombol href={`/${site.tautan.ngobrol}`}>
          Ayo ngobrol <span aria-hidden="true">→</span>
        </Tombol>
      </div>
    </HalamanSederhana>
  );
}
