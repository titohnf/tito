import { site, linkWhatsApp } from "@/config/site";
import styles from "./Kaki.module.css";

export function Kaki() {
  return (
    <footer className={`wadah ${styles.kaki}`}>
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
    </footer>
  );
}
