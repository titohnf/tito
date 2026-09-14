import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/profil";
import { daftarPersona, type Persona } from "@/content/persona";
import { site } from "@/config/site";
import { Tombol } from "./Tombol";
import styles from "./Hero.module.css";

export function Hero({ persona }: { persona: Persona }) {
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
        <span key={persona.id} className={`${styles.julukan} ${styles.masuk}`}>
          {persona.julukan}
        </span>
      </h1>

      <nav className={styles.persona} aria-label="Pilih persona">
        <span className={styles.personaLabel}>{hero.labelPersona}</span>
        <ul className={styles.pilihan}>
          {daftarPersona.map((p) => (
            <li key={p.id}>
              <Link
                href={p.path}
                scroll={false}
                className={styles.opsi}
                aria-current={p.id === persona.id ? "page" : undefined}
              >
                {p.pendek}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.bawah}>
        <p key={persona.id} className={`${styles.paragraf} ${styles.masuk}`}>
          {persona.fakta}
        </p>

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

      {persona.pernahDipercaya && (
        <div className={styles.dipercaya}>
          <p className="label">{persona.pernahDipercaya.label}</p>
          <ul>
            {persona.pernahDipercaya.daftar.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
