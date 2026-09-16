import type { Metadata } from "next";
import Link from "next/link";
import { Kepala } from "@/components/Kepala";
import { Kaki } from "@/components/Kaki";
import { Tombol } from "@/components/Tombol";
import { FunFakta } from "@/components/FunFakta";
import { KerangkaLayar } from "@/components/KerangkaLayar";
import { tera } from "@/content/tera";
import { faktaPelayan } from "@/content/profil";
import { site } from "@/config/site";
import styles from "./tera.module.css";

export const metadata: Metadata = {
  title: tera.label,
  description: tera.intro,
  openGraph: { title: tera.judul, description: tera.intro },
};

export default function HalamanTera() {
  return (
    <>
      <Kepala />
      <main className="wadah">
        {/* Hero kecil */}
        <header className={styles.hero}>
          <Link href="/#pelayan" className={styles.kembali}>
            <span aria-hidden="true">←</span> Kembali
          </Link>
          <p className="label">{tera.label}</p>
          <h1 className={styles.judul}>{tera.judul}</h1>
          <p className={styles.intro}>{tera.intro}</p>
        </header>

        {/* Fun fact: dipindah dari segmen Tentang di beranda ke halaman detail ini */}
        <section className={styles.bagian} aria-labelledby="fakta">
          <h2 id="fakta" className={styles.judulBagian}>
            Fun fact
          </h2>
          <FunFakta fakta={faktaPelayan} />
        </section>

        {/* Cerita lengkap proses build */}
        <section className={styles.bagian} aria-labelledby="cerita">
          <h2 id="cerita" className={styles.judulBagian}>
            Cerita lengkap
          </h2>
          <ol className={styles.cerita}>
            {tera.cerita.map((bab, i) => (
              <li key={bab.judul}>
                <span className={styles.nomor} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.judulBab}>{bab.judul}</h3>
                  {bab.isi.length > 0 ? (
                    bab.isi.map((p) => <p key={p}>{p}</p>)
                  ) : (
                    <p className={styles.menyusul}>Sedang ditulis.</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Screenshot */}
        <section className={styles.bagian} aria-labelledby="screenshot">
          <h2 id="screenshot" className={styles.judulBagian}>
            Screenshot
          </h2>
          <div className={styles.galeri}>
            {tera.screenshot.map((s) => (
              <figure key={s.judul} className={styles.shot}>
                {s.gambar ? (
                  <img src={s.gambar} alt={s.judul} loading="lazy" />
                ) : (
                  <KerangkaLayar varian={s.varian} />
                )}
                <figcaption>{s.judul}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Eksperimen yang gagal */}
        <section className={styles.bagian} aria-labelledby="gagal">
          <h2 id="gagal" className={styles.judulBagian}>
            Eksperimen yang gagal
          </h2>
          <div className={styles.gagal}>
            {tera.gagal.length > 0
              ? tera.gagal.map((e) => (
                  <article key={e.judul} className={styles.kartuGagal}>
                    <h3>{e.judul}</h3>
                    <p>{e.cerita}</p>
                    {e.pelajaran && (
                      <p className={styles.pelajaran}>
                        <span className="label">Pelajaran</span> {e.pelajaran}
                      </p>
                    )}
                  </article>
                ))
              : [1, 2].map((n) => (
                  <article key={n} className={`${styles.kartuGagal} ${styles.kosong}`}>
                    <span className="label">Eksperimen #{n}</span>
                    <p>Sedang ditulis.</p>
                  </article>
                ))}
          </div>
        </section>

        <div className={styles.penutup}>
          <Tombol href={`/${site.tautan.ngobrol}`}>
            Ayo ngobrol <span aria-hidden="true">→</span>
          </Tombol>
          <Tombol href="/" varian="garis">
            Kembali ke beranda
          </Tombol>
        </div>
      </main>
      <Kaki />
    </>
  );
}
