import Image from "next/image";
import { hero } from "@/content/profil";
import { site } from "@/config/site";
import { Tombol } from "./Tombol";
import styles from "./Hero.module.css";

export function Hero() {
  // Foto diselipkan sebelum kata terakhir sapaan: "Hi, saya [foto] Tito"
  const kata = hero.sapaan.split(" ");
  const nama = kata.pop();

  return (
    <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
      <h1 id="hero-judul" className={styles.judul}>
        <span className={styles.sapaan}>
          {kata.join(" ")}{" "}
          <span className={styles.foto}>
            <Image
              src={site.foto}
              alt="Foto Tito Hanafi"
              width={240}
              height={240}
              priority
              unoptimized={site.foto.endsWith(".svg")}
              sizes="120px"
            />
          </span>{" "}
          {nama}
        </span>
        <span className={styles.julukan}>{hero.julukan}</span>
      </h1>

      <div className={styles.bawah}>
        <div className={styles.paragraf}>
          {hero.paragraf.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className={styles.aksi}>
          <Tombol href={site.tautan.bantuan}>
            {hero.tombolUtama} <span aria-hidden="true">→</span>
          </Tombol>
          <div className={styles.aksiKedua}>
            <Tombol href={site.tautan.ngobrol} varian="garis">
              {hero.tombolKedua}
            </Tombol>
            <p className={styles.catatan}>{hero.catatanTombol}</p>
          </div>
        </div>
      </div>

      <div className={styles.dipercaya}>
        <p className="label">{hero.pernahDipercaya.label}</p>
        <ul>
          {hero.pernahDipercaya.daftar.map((nama) => (
            <li key={nama}>{nama}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
