import { KartuBantuan } from "./KartuBantuan";
import styles from "./Bantuan.module.css";

/**
 * Segmen Layanan: empat kartu jasa yang biasa saya bantu.
 * Kartunya komponen yang sama dengan yang dulu dipakai di halaman /bantuan.
 */
export function Bantuan() {
  return (
    // Latar bersemburatnya harus penuh selebar layar, jadi .wadah turun jadi
    // pembungkus di dalam — bukan kelas di <section> seperti segmen biasa.
    <section id="layanan" className={styles.layanan} aria-labelledby="layanan-judul">
      <div className="wadah">
        <p className={styles.label}>Layanan</p>
        <h2 id="layanan-judul" className={styles.judul}>
          Dibuatkan dari awal, atau belajar bikin sendiri? Saya bantu dua-duanya.
        </h2>

        <div className={styles.kartu}>
          <KartuBantuan />
        </div>
      </div>
    </section>
  );
}
