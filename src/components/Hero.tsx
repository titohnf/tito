import { hero } from "@/content/profil";
import { site, linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import { MockupCarousel } from "./MockupCarousel";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <>
      <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
        <div className={styles.teks}>
          <div className={styles.isi}>
            <p className={styles.sapaan}>
              {hero.sapaan}{" "}
              <span className={styles.lambai} aria-hidden="true">
                👋
              </span>
            </p>

            <h1 id="hero-judul" className={styles.judul}>
              <span className={styles.pecah}>{hero.deskripsi.baris1}</span>{" "}
              <span className={styles.pecah}>{hero.deskripsi.baris2}</span>{" "}
              <span className={`${styles.pecah} ${styles.barisKata}`}>
                {hero.deskripsi.baris3}
              </span>
            </h1>
          </div>
        </div>
      </section>

      <div className={styles.bawah}>
        <div className="wadah">
          <div className={styles.aksi}>
            <Tombol href={linkWhatsApp(hero.pesanTombolUtama)} eksternal>
              {hero.tombolUtama} <span aria-hidden="true">→</span>
            </Tombol>
            <Tombol href={site.tautan.rekamJejak} varian="garis">
              {hero.tombolSekunder} <span aria-hidden="true">→</span>
            </Tombol>
          </div>

          <p className={styles.bukti}>
            <svg
              className={styles.centangBukti}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="9" />
              <path d="M5.6 10.4l3 3 5.8-6.4" />
            </svg>
            <span>
              <strong>{hero.bukti.angka}</strong>
              {hero.bukti.teks}
            </span>
          </p>
        </div>
        <div className={styles.mockup}>
          <MockupCarousel />
        </div>
      </div>
    </>
  );
}
