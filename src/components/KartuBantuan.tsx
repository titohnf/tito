"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { layanan, type Layanan } from "@/content/cta";
import { linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import { IkonAudit, IkonNgobrol, IkonWeb } from "./Ikon3D";
import kartu from "./KartuGrid.module.css";
import styles from "./KartuBantuan.module.css";

/**
 * Ikon 3D per layanan, dipetakan dari id-nya. Ikonnya dipakai bersama dengan
 * tempat lain di situs (lihat Ikon3D.tsx) — gelembung obrolan di kartu diskusi
 * sama persis dengan yang dipakai blok ajakan ngobrol.
 */
const ikon: Record<string, (p: { className?: string }) => React.ReactElement> = {
  website: IkonWeb,
  audit: IkonAudit,
  ngobrol: IkonNgobrol,
};

/**
 * Tiga kartu layanan di bab Pendamping (segmen Tentang) dan halaman /bantuan.
 * Diklik membuka pop up berisi detail layanan — isinya masih placeholder.
 */
export function KartuBantuan() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [aktif, setAktif] = useState<Layanan | null>(null);

  const buka = (l: Layanan) => {
    setAktif(l);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <ul className={`${kartu.grid} ${kartu.grid3} ${styles.daftar}`}>
        {layanan.map((l) => {
          const Ikon = ikon[l.id] ?? IkonWeb;
          return (
            <li key={l.id}>
              <button type="button" className={`${kartu.kartu} ${styles.kartu}`} onClick={() => buka(l)}>
                <span className={styles.kepala}>
                  <Ikon className={styles.ikon} />
                </span>
                <h3 className={kartu.namaKartu}>{l.judul}</h3>
                <p className={kartu.ringkasan}>{l.teks}</p>
                <p className={kartu.status}>
                  Klik untuk detail <span aria-hidden="true">→</span>
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Satu dialog dipakai ulang untuk semua kartu; isinya mengikuti kartu yang diklik.
          <dialog> dipilih supaya Esc, fokus, dan backdrop-nya ditangani browser. */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        /* Isi sengaja tidak dikosongkan saat ditutup: kalau dikosongkan, membuka
           lagi sempat menampilkan dialog kosong sepersekian detik. */
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {aktif && (
          <div className={styles.isiDialog}>
            <button
              type="button"
              className={styles.tutup}
              onClick={() => dialogRef.current?.close()}
              aria-label="Tutup"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <h2 className={styles.judulDialog}>{aktif.judulDetail}</h2>

            {aktif.detail.map((bagian) => (
              <section key={bagian.judul} className={styles.bagian}>
                <h3 className={styles.judulBagian}>{bagian.judul}</h3>
                {bagian.paragraf && <p className={styles.teksDialog}>{bagian.paragraf}</p>}
                {bagian.langkah && (
                  <ol className={styles.langkah}>
                    {bagian.langkah.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            <div className={styles.aksiDialog}>
              <Tombol href={linkWhatsApp(aktif.pesan)} eksternal>
                Ngobrol Sekarang <span aria-hidden="true">→</span>
              </Tombol>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
