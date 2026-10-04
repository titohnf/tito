import Image from "next/image";
import { hero } from "@/content/profil";
import { site } from "@/config/site";
import { DaftarIde } from "./DaftarIde";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <>
      <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
        <Image
          className={styles.foto}
          src={site.fotoAsli}
          alt="Foto Tito Hanafi"
          width={96}
          height={96}
          sizes="96px"
          priority
        />
        <p className={styles.sapaan}>{hero.sapaan}</p>
        <h1 id="hero-judul" className={styles.judul}>
          {hero.judulUtama}
        </h1>
      </section>

      <div className={`wadah ${styles.papan}`}>
        <DaftarIde />
      </div>
    </>
  );
}
