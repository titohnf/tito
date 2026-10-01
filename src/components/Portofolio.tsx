import Image from "next/image";
import { portofolio, type KartuPortofolio } from "@/content/portofolio";
import { site } from "@/config/site";
import { GeseranPortofolio } from "./GeseranPortofolio";
import { KontrolVideo } from "./KontrolVideo";
import { PratinjauBimbel } from "./PratinjauBimbel";
import { Tombol } from "./Tombol";
import { VideoPopup } from "./VideoPopup";
import kartuStyles from "./KartuGrid.module.css";
import styles from "./Portofolio.module.css";

function KartuItem({ k, tinggiTetap }: { k: KartuPortofolio; tinggiTetap: boolean }) {
  const warnaKartu = tinggiTetap ? styles.kartuBiru : styles.kartuWarna;
  const duaKartu = tinggiTetap;
  return (
                  <div className={`${styles.itemKartu} ${k.mobile ? styles.itemMobile : ""}`}>
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
                            <VideoPopup src={k.video} poster={k.poster} judul={k.judul} mobile={k.mobile} />
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
                      <h3
                        className={`${kartuStyles.namaKartu} ${styles.judulKartu} ${duaKartu ? styles.judulKartuOverlay : ""} ${k.video ? styles.judulBerkontrol : ""}`}
                      >
                        {k.judul}
                        {k.deskripsi && <span className={styles.deskripsiKartu}>{k.deskripsi}</span>}
                      </h3>
                      {k.video && <KontrolVideo judul={k.judul} />}
                    </div>
                  </div>
  );
}

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
          <Tombol href="/rekam-jejak/bimbel-tera" varian="garis">
            Baca Ceritanya <span aria-hidden="true">→</span>
          </Tombol>
        </div>
        <p className={styles.perusahaan}>PT. Sinergi Cendikia Indonesia</p>

        <div className={styles.kelompokDaftar}>
          {portofolio.map((kelompok) => (
            <div key={kelompok.judul} className={styles.kelompok}>
              {kelompok.deskripsi && <p className={styles.deskripsiKelompok}>{kelompok.deskripsi}</p>}

              {kelompok.kartu.length <= 2 ? (
                <ul className={kelompok.kartu.length === 1 ? styles.satu : styles.dua}>
                  {kelompok.kartu.map((k) => (
                    <li key={k.judul}>
                      <KartuItem k={k} tinggiTetap={kelompok.kartu.length === 2} />
                    </li>
                  ))}
                </ul>
              ) : (
                <GeseranPortofolio>
                  {kelompok.kartu.map((k) => (
                    <li key={k.judul} className={k.mobile ? styles.slideMobile : styles.slide}>
                      <KartuItem k={k} tinggiTetap />
                    </li>
                  ))}
                </GeseranPortofolio>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
