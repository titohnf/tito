import type { BabTentang } from "@/content/profil";
import { site } from "@/config/site";
import { Tombol } from "./Tombol";
import styles from "./Tentang.module.css";

export function Tentang({ bab: daftarBab }: { bab: BabTentang[] }) {
  return (
    <section id="tentang" className={styles.tentang} aria-labelledby="tentang-judul">
      <div className="wadah">
        <h2 id="tentang-judul" className="label">
          Tentang saya
        </h2>

        <ol className={styles.daftar}>
          {daftarBab.map((bab, i) => (
            <li key={bab.id} id={bab.id} className={styles.bab}>
              <div className={styles.kepalaBab}>
                <p className={styles.labelBab}>
                  <span>{bab.label}</span>
                  {daftarBab.length > 1 && (
                    <span className={styles.nomor} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </p>
                <h3 className={styles.judul}>{bab.judul}</h3>
              </div>

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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
