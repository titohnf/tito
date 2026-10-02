"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoPopup.module.css";

type Props = {
  src: string;
  poster?: string;
  judul: string;
  /** Video potret (HP): popup dibatasi tingginya, bukan lebarnya. */
  mobile?: boolean;
};

/**
 * Video pratinjau di kartu: diputar diam-diam di dalam kartu, dan kalau diklik
 * terbuka dalam popup yang lebih besar (dialog bawaan browser, jadi Esc, fokus,
 * dan klik di luar sudah beres). Video di popup baru dipasang saat dibuka,
 * supaya selalu mulai dari awal.
 */
export function VideoPopup({ src, poster, judul, mobile }: Props) {
  const [terbuka, setTerbuka] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (terbuka && !d.open) d.showModal();
    if (!terbuka && d.open) d.close();
  }, [terbuka]);

  return (
    <>
      <button
        type="button"
        className={styles.pemicu}
        onClick={() => setTerbuka(true)}
        aria-label={`Perbesar video: ${judul}`}
      >
        {/* Tanpa autoPlay: yang menentukan kapan video di kartu diputar adalah
            GeseranPortofolio (hanya kartu aktif), supaya tidak semua bergerak sekaligus. */}
        <video className={styles.video} src={src} poster={poster} preload="none" loop muted playsInline />
        <span className={styles.petunjuk} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          Perbesar
        </span>
      </button>

      <dialog
        ref={dialog}
        className={`${styles.dialog} ${mobile ? styles.dialogMobile : styles.dialogWeb}`}
        aria-label={judul}
        onClose={() => setTerbuka(false)}
        onClick={(e) => {
          // Klik di area gelap (di luar kartu popup) menutup popup.
          if (e.target === e.currentTarget) setTerbuka(false);
        }}
      >
        {terbuka && (
          <div className={styles.isi}>
            <div className={styles.kepala}>
              <h2 className={styles.judul}>{judul}</h2>
            </div>
            <div className={styles.layarBesar}>
              <video
                className={styles.videoBesar}
                src={src}
                poster={poster}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            </div>
            <button type="button" className={styles.tutup} onClick={() => setTerbuka(false)} aria-label="Tutup">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
