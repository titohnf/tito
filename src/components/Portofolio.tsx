import Image from "next/image";
import { portofolio } from "@/content/portofolio";
import { site } from "@/config/site";
import { PratinjauBimbel } from "./PratinjauBimbel";
import { Tombol } from "./Tombol";
import kartuStyles from "./KartuGrid.module.css";
import styles from "./Portofolio.module.css";

/** Portofolio di beranda: kelompok kartu, memakai gaya kartu rekam jejak. */
export function Portofolio() {
  return (
    <section className={styles.segmen} aria-labelledby="portofolio-judul">
      <div className="wadah">
        <div className={styles.kepala}>
          <div>
            <p className={styles.label}>Rekam Jejak</p>
            <h2 id="portofolio-judul" className={styles.judul}>
              Membangun sistem Bimbel
            </h2>
          </div>
          <Tombol href={site.tautan.rekamJejak} varian="garis">
            Lihat seluruh rekam jejak <span aria-hidden="true">→</span>
          </Tombol>
        </div>
        <p className={styles.subjudul}>
          dari progres siswa hingga status pembayaran, semua tercatat dengan jelas.
        </p>

        <div className={styles.kelompokDaftar}>
          {portofolio.map((kelompok) => (
            <div key={kelompok.judul} className={styles.kelompok}>
              {kelompok.deskripsi && <p className={styles.deskripsiKelompok}>{kelompok.deskripsi}</p>}

              <ul
                className={
                  kelompok.kartu.length === 1
                    ? styles.satu
                    : kelompok.kartu.length === 2
                      ? styles.dua
                      : `${kartuStyles.grid} ${kartuStyles.grid3}`
                }
              >
                {kelompok.kartu.map((k) => {
                  const duaKartu = kelompok.kartu.length === 2;
                  const warnaKartu = duaKartu ? styles.kartuBiru : styles.kartuWarna;
                  return (
                  <li key={k.judul} className={styles.itemKartu}>
                    <div
                      className={`${kartuStyles.kartu} ${warnaKartu} ${duaKartu ? styles.kartuTinggiTetap : ""}`}
                    >
                      <div className={`${styles.bingkai} ${k.mobile ? styles.bingkaiMobile : ""}`}>
                        {!k.mobile && (
                          <span className={styles.bilah} aria-hidden="true">
                            <i />
                            <i />
                            <i />
                          </span>
                        )}
                        <div className={`${styles.layar} ${k.mobile ? styles.layarMobile : ""}`}>
                          {k.pratinjau ? (
                            <PratinjauBimbel />
                          ) : k.video ? (
                            <video
                              className={kartuStyles.videoKartu}
                              src={k.video}
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : k.gambar ? (
                            <>
                              {k.poster && (
                                <Image
                                  src={k.poster}
                                  alt=""
                                  fill
                                  sizes={k.mobile ? "13rem" : "(min-width: 1000px) 40rem, 100vw"}
                                  className={styles.posterGambar}
                                />
                              )}
                              <Image
                                src={k.gambar}
                                alt=""
                                fill
                                sizes={k.mobile ? "13rem" : "(min-width: 1000px) 40rem, 100vw"}
                                unoptimized={k.gambar.endsWith(".gif")}
                              />
                            </>
                          ) : (
                            <span aria-hidden="true">Gambar</span>
                          )}
                        </div>
                      </div>
                      <h4
                        className={`${kartuStyles.namaKartu} ${styles.judulKartu} ${duaKartu ? styles.judulKartuOverlay : ""}`}
                      >
                        {k.judul}
                      </h4>
                    </div>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
