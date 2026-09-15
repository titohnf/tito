import { hero } from "@/content/profil";
import { pesanUmum } from "@/content/cta";
import { site, linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import { HeroCoblos } from "./HeroCoblos";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
      <HeroCoblos />

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
