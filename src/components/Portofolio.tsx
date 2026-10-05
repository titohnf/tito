import Image from "next/image";
import Link from "next/link";
import { kartuStudiKasus, type KartuPortofolio } from "@/content/portofolio";
import { BentoPortofolio } from "./BentoPortofolio";
import { PratinjauBimbel } from "./PratinjauBimbel";
import kartuStyles from "./KartuGrid.module.css";
import styles from "./Portofolio.module.css";

function KartuItem({ k }: { k: KartuPortofolio }) {
  return (
    <div className={`${styles.itemKartu} ${k.mobile ? styles.itemMobile : ""}`}>
      <div
        className={`${kartuStyles.kartu} ${styles.kartuTinggiTetap}`}
      >
        <div className={`${styles.bingkai} ${k.mobile ? styles.bingkaiMobile : styles.bingkaiLaptop}`}>
          <div className={`${styles.layar} ${k.mobile ? styles.layarMobile : ""}`}>
            {k.pratinjau ? (
              <PratinjauBimbel />
            ) : k.video ? (
              <video
                className={styles.videoKartu}
                src={k.video}
                poster={k.poster}
                preload="none"
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
        <h3
          className={`${kartuStyles.namaKartu} ${styles.judulKartu} ${styles.judulKartuOverlay} ${k.mobile ? styles.judulHp : styles.judulWeb} ${k.logo ? styles.judulLogo : ""}`}
        >
          {k.logo && (
            <Image src={k.logo} alt="" width={88} height={88} className={styles.logoKartu} />
          )}
          {k.judul}
          {(k.label || k.tag) && (
            <span className={styles.barisLabel}>
              {k.label && <span className={styles.labelKartu}>{k.label}</span>}
              {k.tag?.map((t) => (
                <span key={t} className={styles.tagKartu}>
                  {t}
                </span>
              ))}
            </span>
          )}
        </h3>
        <Link
          href={`/studi-kasus/${k.slug}`}
          className={styles.linkKartu}
          aria-label={`Baca studi kasus: ${k.judul}`}
        />
      </div>
    </div>
  );
}

/**
 * Semua kartu studi kasus dalam satu bento: kartu web (lebar) dan kartu HP (sempit)
 * berselang-seling per baris, tanpa dipisah per segmen.
 */
export function Portofolio() {
  const semua = kartuStudiKasus();
  const web = semua.filter((k) => !k.mobile);
  const hp = semua.filter((k) => k.mobile);
  const urut: KartuPortofolio[] = [];
  for (let baris = 0; web.length || hp.length; baris++) {
    const pasangan = baris % 2 === 0 ? [web, hp] : [hp, web];
    for (const antrean of pasangan) {
      const k = antrean.shift();
      if (k) urut.push(k);
    }
  }
  return (
    <BentoPortofolio>
      {urut.map((k) => (
        <li key={k.judul} className={k.mobile ? styles.bentoMobile : styles.bentoWeb}>
          <KartuItem k={k} />
        </li>
      ))}
    </BentoPortofolio>
  );
}
