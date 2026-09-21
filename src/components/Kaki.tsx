import { site, linkWhatsApp } from "@/config/site";
import styles from "./Kaki.module.css";

export function Kaki() {
  return (
    // Latar gelapnya harus penuh selebar layar, jadi .wadah turun jadi pembungkus
    // di dalam — sama seperti segmen Ayo Ngobrol tepat di atasnya.
    <footer className={styles.kaki}>
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
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
