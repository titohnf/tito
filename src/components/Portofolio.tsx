import Image from "next/image";
import { Globe } from "lucide-react";
import { segmenPortofolio, type KartuPortofolio } from "@/content/portofolio";
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
                        className={`${kartuStyles.namaKartu} ${styles.judulKartu} ${duaKartu ? styles.judulKartuOverlay : ""} ${k.video ? styles.judulBerkontrol : ""} ${k.web ? styles.judulWeb : ""} ${k.logo ? styles.judulLogo : ""}`}
                      >
                        {k.logo && (
                          <Image src={k.logo} alt="" width={88} height={88} className={styles.logoKartu} />
                        )}
                        {k.label && <span className={styles.labelKartu}>{k.label}</span>}
                        {k.judul}
                        {k.deskripsi && <span className={styles.deskripsiKartu}>{k.deskripsi}</span>}
                        {k.web && (
                          <span className={styles.ikonWeb} aria-hidden="true">
                            <Globe size={16} strokeWidth={2} />
                          </span>
                        )}
                      </h3>
                      {k.video && <KontrolVideo judul={k.judul} />}
                      {k.web && (
                        <a
                          href={k.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkKartu}
                          aria-label={`Kunjungi website ${k.judul}`}
                        >
                        </a>
                      )}
                    </div>
                  </div>
  );
}

/** Portofolio di beranda: segmen-segmen Rekam Jejak, memakai gaya kartu rekam jejak. */
export function Portofolio() {
  return (
    <>
      {segmenPortofolio.map((segmen) => (
        <section key={segmen.id} className={`${styles.segmen} ${segmen.tema === "merah" ? styles.temaMerah : ""}`} aria-labelledby={`portofolio-${segmen.id}`}>
          <div className="wadah">
            <div className={styles.kepala}>
              <div>
                {segmen.label && <p className={styles.label}>{segmen.label}</p>}
                <h2 id={`portofolio-${segmen.id}`} className={styles.judul}>
                  {segmen.judul}
                </h2>
              </div>
              {segmen.tombol && (
                <Tombol href={segmen.tombol.href} varian="garis" eksternal>
                  {segmen.tombol.label} <span aria-hidden="true">→</span>
                </Tombol>
              )}
            </div>
            <ul className={styles.daftarPil}>
              {segmen.pil.map((p) => (
                <li key={p} className={styles.perusahaan}>
                  {p}
                </li>
              ))}
            </ul>

            <div className={styles.kelompokDaftar}>
              {segmen.kelompok.map((kelompok) => (
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
      ))}
    </>
  );
}
