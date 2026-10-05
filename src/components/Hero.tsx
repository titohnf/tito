import Image from "next/image";
import { hero } from "@/content/profil";
import { linkWhatsApp, site } from "@/config/site";
import { Tombol } from "./Tombol";
import { tanggalCommitTerakhir, formatTanggalId } from "@/lib/tanggal-commit";
import { DaftarIde } from "./DaftarIde";
import styles from "./Hero.module.css";

export function Hero() {
  // Tanggal update terakhir papan projek = commit terakhir yang mengubah src/content/kanban.ts.
  const diperbarui = formatTanggalId(tanggalCommitTerakhir("src/content/kanban.ts"));
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
        <p className={styles.deskripsi}>{hero.deskripsi}</p>
        <div className={styles.aksi}>
          <Tombol href={linkWhatsApp(hero.pesanWA)} eksternal>
            {hero.tombol}
          </Tombol>
        </div>
      </section>

      <div className={`wadah ${styles.papan}`}>
        <DaftarIde diperbarui={diperbarui} />
      </div>
    </>
  );
}
