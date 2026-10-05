import { site, linkWhatsApp } from "@/config/site";
import styles from "./Kaki.module.css";

/**
 * `sambung`: kaki langsung menyambung segmen gelap di atasnya (beranda, tepat
 * setelah segmen Ayo Ngobrol). Jarak di atas garis pemisah sudah disediakan
 * segmen itu lewat padding bawahnya, jadi kaki tidak menambah jarak sendiri —
 * kalau ditambah, jaraknya dobel.
 */
export function Kaki({ sambung = false }: { sambung?: boolean }) {
  return (
    // Latar gelapnya harus penuh selebar layar, jadi .wadah turun jadi pembungkus
    // di dalam — sama seperti segmen Ayo Ngobrol tepat di atasnya.
    <footer className={`${styles.kaki} ${sambung ? styles.sambung : ""}`}>
      <div className="wadah">
        <div className={styles.isi}>
          <p>
            © {new Date().getFullYear()} {site.nama}
          </p>
          <ul className={styles.kontak}>
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
