import Image from "next/image";
import { hero } from "@/content/profil";
import { pesanUmum } from "@/content/cta";
import { site, linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import { KataDinamis } from "./KataDinamis";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
      <div className={styles.foto}>
        <Image
          src={site.foto}
          alt="Foto Tito Hanafi"
          width={320}
          height={320}
          priority
          unoptimized
          sizes="160px"
        />
      </div>
      <h1 id="hero-judul" className={styles.judul}>
        <span className={styles.sapaan}>{hero.sapaan}</span>
        <span className={styles.julukan}>
          {hero.julukan.awal}{" "}
          <KataDinamis kata={hero.julukan.kata} intervalMs={hero.intervalGantiMs} />{" "}
          {hero.julukan.akhir}
        </span>
      </h1>

      <div className={styles.bawah}>
        <p className={styles.paragraf}>{hero.paragraf}</p>

        <div className={styles.aksi}>
          <Tombol href={site.tautan.bantuan}>
            {hero.tombolUtama} <span aria-hidden="true">→</span>
          </Tombol>
          <p className={styles.catatan}>
            atau{" "}
            <a href={linkWhatsApp(pesanUmum)} target="_blank" rel="noopener noreferrer">
              {hero.tautanWhatsApp}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
