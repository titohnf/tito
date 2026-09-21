import { kepalaBantuan } from "@/content/cta";
import { KartuBantuan } from "./KartuBantuan";
import styles from "./Bantuan.module.css";

/**
 * Segmen penutup sebelum ajakan ngobrol: tiga layanan yang biasa saya bantu.
 * Kartunya komponen yang sama dengan halaman /bantuan.
 */
export function Bantuan() {
  return (
    // Latar bersemburatnya harus penuh selebar layar, jadi .wadah turun jadi
    // pembungkus di dalam — bukan kelas di <section> seperti segmen biasa.
    <section id="bantuan" className={styles.bantuan} aria-labelledby="bantuan-judul">
      <div className="wadah">
        <h2 id="bantuan-judul" className={styles.judul}>
          {kepalaBantuan.judul}
        </h2>

        <div className={styles.kartu}>
          <KartuBantuan />
        </div>
      </div>
    </section>
  );
}
