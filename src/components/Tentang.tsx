import { tentang } from "@/content/profil";
import { site } from "@/config/site";
import { Tombol } from "./Tombol";
import styles from "./Tentang.module.css";

export function Tentang() {
  return (
    <section id="tentang" className={styles.tentang} aria-labelledby="tentang-judul">
      <div className="wadah">
        <h2 id="tentang-judul" className="label">
          Tentang saya
        </h2>

        <ol className={styles.daftar}>
          {tentang.map((bab, i) => (
            <li key={bab.id} id={bab.id} className={styles.bab}>
              <div className={styles.kepalaBab}>
                <span className={styles.nomor} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.judul}>{bab.judul}</h3>
              </div>

              <div className={styles.isi}>
                {bab.paragraf.map((p) => (
                  <p key={p}>{p}</p>
                ))}

                {bab.funFact && (
                  <aside className={styles.funFact}>
                    <span className={styles.funFactLabel}>Fun fact</span>
                    <p>{bab.funFact}</p>
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
