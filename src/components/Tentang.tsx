import Image from "next/image";
import type { BabTentang } from "@/content/profil";
import { site } from "@/config/site";
import { Tombol } from "./Tombol";
import styles from "./Tentang.module.css";

type Sorotan = NonNullable<BabTentang["sorotan"]>[number];

// TODO: isi `sorotan` di src/content/profil.ts — selama kosong, 3 kartu ini yang tampil
const placeholder: Sorotan[] = [1, 2, 3].map((n) => ({
  judul: `Judul sorotan ${n}`,
  teks: "Teks singkat 1–2 kalimat yang menjelaskan sorotan ini.",
  tombol: "Selengkapnya",
  href: "#",
}));

export function Tentang({ bab: daftarBab }: { bab: BabTentang[] }) {
  return (
    <section id="tentang" className={styles.tentang} aria-labelledby="tentang-judul">
      <div className="wadah">
        <h2 id="tentang-judul" className="sr-only">
          Tentang saya
        </h2>

        <ol className={styles.daftar}>
          {daftarBab.map((bab) => (
            <li key={bab.id} id={bab.id} className={styles.bab}>
              <div className={styles.kiri}>
                <p className={styles.labelBab}>
                  <span>{bab.label}</span>
                </p>
                <h3 className={styles.judul}>{bab.judul}</h3>

                <div className={styles.isi}>
                  {bab.paragraf.map((p) => (
                    <p key={p}>{p}</p>
                  ))}

                  {bab.funFact && (
                    <aside className={styles.funFact}>
                      <p>
                        <span className={styles.funFactTag}>
                          <svg viewBox="0 0 12 12" aria-hidden="true">
                            <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" />
                          </svg>
                          Fun fact
                        </span>{" "}
                        {bab.funFact}
                      </p>
                    </aside>
                  )}

                  {bab.tautan && (
                    <div className={styles.tautan}>
                      <Tombol href={site.tautan[bab.tautan.href]} varian="teks">
                        {bab.tautan.label} <span aria-hidden="true">→</span>
                      </Tombol>
                    </div>
                  )}
                </div>
              </div>

              <ul className={styles.sorotan}>
                {(bab.sorotan?.length ? bab.sorotan : placeholder).map((s) => (
                  <li key={s.judul} className={styles.kartu}>
                    <div className={styles.gambar}>
                      {s.gambar ? (
                        <Image src={s.gambar} alt="" fill sizes="(min-width: 900px) 34rem, 100vw" />
                      ) : (
                        <span aria-hidden="true">Gambar</span>
                      )}
                    </div>
                    <div className={styles.teksKartu}>
                      <h4 className={styles.judulKartu}>{s.judul}</h4>
                      <p>{s.teks}</p>
                      <div className={styles.tombolKartu}>
                        <Tombol href={s.href} varian="garis">
                          {s.tombol}
                        </Tombol>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
