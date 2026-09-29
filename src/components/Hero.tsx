import Image from "next/image";
import { hero } from "@/content/profil";
import { site, linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
      <div className={styles.wadahFoto}>
        <Image
          src={site.fotoAsli}
          alt="Foto Tito Hanafi"
          width={320}
          height={320}
          priority
          unoptimized
          sizes="(min-width: 640px) 7rem, 5.5rem"
          className={styles.foto}
        />
      </div>

      <p className={styles.sapaan}>{hero.sapaan}</p>

      <h1 id="hero-judul" className={styles.judul}>
        {hero.judul}
      </h1>

      <div className={styles.aksi}>
        <Tombol href={linkWhatsApp(hero.pesanTombolUtama)} eksternal>
          {hero.tombolUtama} <span aria-hidden="true">→</span>
        </Tombol>
        <Tombol href={site.tautan.layanan} varian="garis">
          {hero.tombolSekunder} <span aria-hidden="true">→</span>
        </Tombol>
      </div>
    </section>
  );
}
