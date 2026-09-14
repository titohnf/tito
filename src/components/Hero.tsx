import Image from "next/image";
import { hero } from "@/content/profil";
import { site } from "@/config/site";
import { Tombol } from "./Tombol";
import { HeroDinamis } from "./HeroDinamis";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`wadah ${styles.hero}`} aria-labelledby="hero-judul">
      <HeroDinamis
        foto={
          <Image
            src={site.foto}
            alt="Foto Tito Hanafi"
            width={240}
            height={240}
            priority
            unoptimized={site.foto.endsWith(".svg")}
            sizes="120px"
          />
        }
        aksi={
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
        }
      />

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
