"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./GaleriPolaroid.module.css";

export type FotoPolaroid = { src: string; alt: string };

/** Jeda antar pergantian foto otomatis, dalam milidetik. */
const JEDA_OTOMATIS = 4000;

/**
 * Carousel foto gaya polaroid: berganti sendiri, tanpa panah/titik navigasi.
 * Dipakai di segmen Tentang, di kolom kanan sejajar dengan paragraf & fun fact.
 */
export function GaleriPolaroid({ foto }: { foto: FotoPolaroid[] }) {
  const [aktif, setAktif] = useState(0);
  const jumlah = foto.length;

  useEffect(() => {
    if (jumlah <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setAktif((a) => (a + 1) % jumlah);
    }, JEDA_OTOMATIS);
    return () => clearInterval(timer);
  }, [jumlah]);

  if (jumlah === 0) return null;

  return (
    <div className={styles.polaroid}>
      <span className={styles.selotip} aria-hidden="true" />
      {foto.map((f, i) => (
        <Image
          key={f.src}
          src={f.src}
          alt={f.alt}
          width={640}
          height={800}
          sizes="(min-width: 760px) 16rem, 60vw"
          className={styles.foto}
          data-aktif={i === aktif || undefined}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
