import { tentangSingkat } from "@/content/profil";
import { FunFakta } from "./FunFakta";
import { GaleriPolaroid } from "./GaleriPolaroid";
import { Testimoni } from "./Testimoni";
import styles from "./Tentang.module.css";

const fotoTentang = [
  { src: "/images/tentang-foto-1.webp", alt: "Tito memimpin diskusi tim dalam sebuah lokakarya" },
  { src: "/images/tentang-foto-2.webp", alt: "Tito bersama rekan-rekan kerja" },
  { src: "/images/tentang-foto-3.webp", alt: "Tito berswafoto bersama murid-murid bimbel di depan papan tulis" },
  { src: "/images/tentang-foto-4.webp", alt: "Tito berdiskusi sambil membuka laptop bersama dua rekan di ruang belajar" },
];

/**
 * Segmen "Sedikit tentang saya" digabung dengan "Kata rekan kerja" — satu
 * segmen, satu latar. Kolom kiri: paragraf lalu fun fact di bawahnya. Kolom
 * kanan: foto gaya polaroid, sejajar dengan keduanya. Papan testimoni
 * turun ke bawah, selebar segmen.
 */
export function Tentang() {
  return (
    <section id="tentang" className={styles.tentang} aria-labelledby="tentang-judul">
      <div className="wadah">
        <div className={styles.baris}>
          <div>
            <p className={styles.label}>{tentangSingkat.judul}</p>
            <h2 id="tentang-judul" className={styles.paragraf}>
              {tentangSingkat.paragraf}
            </h2>
            <div className={styles.fakta}>
              <FunFakta
                fakta={tentangSingkat.funFakta}
                bungkus
                baris={2}
              />
            </div>
          </div>

          <GaleriPolaroid foto={fotoTentang} />
        </div>

        <Testimoni />
      </div>
    </section>
  );
}
