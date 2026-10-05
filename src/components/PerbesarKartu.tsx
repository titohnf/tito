"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import kartu from "./Portofolio.module.css";
import styles from "./PerbesarKartu.module.css";

type Props = {
  judul: string;
  video?: string;
  poster?: string;
  gambar?: string;
  /** Pil di bawah judul (mis. "Usaha"), sama dengan yang tampil di kartunya. */
  tag?: string[];
  /** Rekaman potret (HP): pop up ditampilkan tinggi, bukan lebar 16:9. */
  mobile?: boolean;
};

/**
 * Pengganti tautan untuk kartu yang produknya internal (tidak ada situsnya): klik kartu
 * membuka pop up yang memperbesar rekaman/gambarnya. Tutup dengan tombol X, klik di luar,
 * atau Esc. Isi pop up (termasuk videonya) baru dipasang saat dibuka.
 */
export function PerbesarKartu({ judul, video, poster, gambar, tag, mobile }: Props) {
  const [buka, setBuka] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (buka && !d.open) d.showModal();
    if (!buka && d.open) d.close();
  }, [buka]);

  // Halaman di belakang pop up tidak ikut tergulir.
  useEffect(() => {
    if (!buka) return;
    const lama = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = lama;
    };
  }, [buka]);

  return (
    <>
      <button
        type="button"
        className={kartu.linkKartu}
        aria-label={`Perbesar: ${judul}`}
        aria-haspopup="dialog"
        onClick={() => setBuka(true)}
      />
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={judul}
        // Esc: state yang menutup dialog (lewat efek di atas), bukan penutupan bawaan browser,
        // supaya state dan kunci gulir halaman selalu ikut berubah.
        onCancel={(e) => {
          e.preventDefault();
          setBuka(false);
        }}
        onClose={() => setBuka(false)}
        // Klik pada latar gelap (elemen <dialog> itu sendiri) menutup pop up.
        onClick={(e) => {
          if (e.target === e.currentTarget) setBuka(false);
        }}
      >
        {buka && (
          <div className={styles.isi}>
            <button type="button" className={styles.tutup} aria-label="Tutup" onClick={() => setBuka(false)}>
              <X size={18} strokeWidth={2.4} aria-hidden="true" />
            </button>
            <div className={styles.kepala}>
              <h2 className={styles.judul}>{judul}</h2>
              {tag && tag.length > 0 && (
                <span className={styles.baris}>
                  {tag.map((t) => (
                    <span key={t} className={kartu.tagKartu}>
                      {t}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <div className={`${styles.layar} ${mobile ? styles.layarHp : styles.layarWeb}`}>
              {video ? (
                <video className={styles.media} src={video} poster={poster} controls autoPlay loop muted playsInline />
              ) : (
                gambar && <Image src={gambar} alt={judul} fill sizes="(min-width: 1000px) 70rem, 100vw" className={styles.media} />
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
