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

      <p className={styles.sapaan}>
        {hero.sapaan}{" "}
        <span className={styles.lambai} aria-hidden="true">
          👋
        </span>
      </p>

      <h1 id="hero-judul" className={styles.judul}>
        {hero.judul}
      </h1>

      <p className={styles.deskripsi}>
        {hero.deskripsi.awal}
        <strong className={styles.tebal}>{hero.deskripsi.pemilik}</strong>
        {hero.deskripsi.sebelum}
        <strong className={`${styles.tebal} ${styles.lingkar}`}>
          {hero.deskripsi.lingkar}
          <svg className={styles.coretan} viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M17 11C31 4 68 3 88 8c11 4 11 19-4 24-20 7-58 7-75-1C-1 24 4 12 21 7c10-3 19-4 25-4.5" />
          </svg>
        </strong>
        {hero.deskripsi.tengah}
        <strong className={styles.sorot}>{hero.deskripsi.sorot}</strong>
        {hero.deskripsi.akhir}
        <svg className={styles.centang} viewBox="0 0 24 24" aria-hidden="true">
          <path pathLength="1" d="M3.5 13.2c2 1.600 3.600 3.400 5 5.600C11 12.500 15.500 7.500 21 4.200" />
        </svg>
      </p>

      <div className={styles.aksi}>
        <Tombol href={linkWhatsApp(hero.pesanTombolUtama)} eksternal>
          {hero.tombolUtama} <span aria-hidden="true">→</span>
        </Tombol>
        <Tombol href={site.tautan.layanan} varian="garis">
          {hero.tombolSekunder} <span aria-hidden="true">→</span>
        </Tombol>
      </div>

      <p className={styles.bukti}>
        <strong>{hero.bukti.angka}</strong>
        {hero.bukti.teks}
      </p>
    </section>
  );
}
