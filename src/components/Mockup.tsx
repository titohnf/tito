import { MockupCarousel } from "./MockupCarousel";
import styles from "./Mockup.module.css";

/** Segmen sendiri untuk carousel mockup, dipisah dari Hero. */
export function Mockup() {
  return (
    <section className={styles.mockup} aria-label="Contoh website yang pernah dibuat">
      <MockupCarousel />
    </section>
  );
}
