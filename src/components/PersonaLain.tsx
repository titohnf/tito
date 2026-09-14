import Link from "next/link";
import { daftarPersona, type PersonaId } from "@/content/persona";
import { hero } from "@/content/profil";
import styles from "./PersonaLain.module.css";

/** Ajakan di akhir halaman untuk melihat dua persona lainnya. */
export function PersonaLain({ aktif }: { aktif: PersonaId }) {
  const lain = daftarPersona.filter((p) => p.id !== aktif);

  return (
    <section className={`wadah ${styles.lain}`} aria-label="Persona lain">
      <ul className={styles.grid}>
        {lain.map((p) => (
          <li key={p.id}>
            <Link href={p.path} className={styles.kartu}>
              <span className={styles.label}>{hero.labelPersona}</span>
              <span className={styles.nama}>{p.nama}</span>
              <span className={styles.fakta}>{p.fakta}</span>
              <span className={styles.panah} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
