import { hero } from "@/content/profil";
import { linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import { DaftarIde } from "./DaftarIde";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <>
      <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
        <p className={styles.sapaan}>{hero.sapaan}</p>
        <h1 id="hero-judul" className={styles.judul}>
          {hero.judulUtama}
        </h1>
        <p className={styles.deskripsi}>{hero.deskripsi}</p>
        <div className={styles.aksi}>
          <Tombol href={linkWhatsApp(hero.pesanWA)} eksternal>
            {hero.tombol}
          </Tombol>
        </div>
      </section>

      <div className={`wadah ${styles.papan}`}>
        <DaftarIde />
      </div>
    </>
  );
}
