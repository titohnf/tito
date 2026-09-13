import { kontenTampil } from "@/content/konten";
import { GridKonten } from "./GridKonten";
import styles from "./Pikiran.module.css";

export function Pikiran() {
  return (
    <section id="pikiran" className={styles.pikiran} aria-labelledby="pikiran-judul">
      <div className="wadah">
        <h2 id="pikiran-judul" className={styles.judul}>
          Apa yang saya pikirkan
        </h2>
        <GridKonten items={kontenTampil()} />
      </div>
    </section>
  );
}
