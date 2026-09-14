import Link from "next/link";
import { laporanKerja, type Persona } from "@/content/persona";
import { kebutuhan } from "@/content/cta";
import { site } from "@/config/site";
import { MembangunTera } from "./MembangunTera";
import styles from "./KaryaPersona.module.css";

const nomor = (i: number) => String(i + 1).padStart(2, "0");
const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Bagian "karya" yang berbeda untuk tiap persona. */
export function KaryaPersona({ persona }: { persona: Persona }) {
  if (persona.karya === "membangun-tera") {
    return (
      <section className={`wadah ${styles.karya}`}>
        <MembangunTera />
      </section>
    );
  }

  if (persona.karya === "laporan-kerja") {
    return (
      <section id="laporan-kerja" className={`wadah ${styles.karya}`} aria-labelledby="karya-judul">
        <h2 id="karya-judul" className={styles.judul}>
          Laporan kerja
        </h2>
        <ul className={styles.grid}>
          {laporanKerja.map((l, i) => (
            <li key={l.instansi}>
              <Link href={site.tautan.laporanKerja} className={styles.kartu}>
                <span className={styles.nomor}>{nomor(i)}</span>
                <h3 className={styles.namaKartu}>{l.instansi}</h3>
                <p className={styles.sub}>{l.tim}</p>
                <p className={styles.status}>
                  Studi kasus menyusul <span aria-hidden="true">→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="bantuan" className={`wadah ${styles.karya}`} aria-labelledby="karya-judul">
      <h2 id="karya-judul" className={styles.judul}>
        Apa yang bisa saya bantu
      </h2>
      <ul className={styles.grid}>
        {kebutuhan.map((k, i) => (
          <li key={k.id}>
            <a href="#ngobrol" className={styles.kartu}>
              <span className={styles.nomor}>{nomor(i)}</span>
              <h3 className={styles.namaKartu}>{kapital(k.label)}</h3>
              <p className={styles.status}>
                Ngobrol soal ini <span aria-hidden="true">→</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
