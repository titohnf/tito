"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { hero } from "@/content/profil";
import { site } from "@/config/site";
import { cabut, dukung } from "@/lib/dukungan";
import { KataDinamis } from "./KataDinamis";
import styles from "./Hero.module.css";

// Emoji perayaan yang terlempar dari foto: [emoji, geser x, geser y] dalam em
const perayaan: [string, number, number][] = [
  ["🎉", -3.4, -2],
  ["🎊", 3.4, -2.2],
  ["🎺", -4, 0.8],
  ["✨", 3.8, 1],
  ["✨", -1.6, -3.4],
  ["🎉", 1.8, -3.2],
  ["🎊", -2.8, 2.6],
  ["🎺", 3, 2.4],
];

/**
 * Foto + judul hero dengan gamifikasi "coblos" ala pemilu:
 * kursor jadi paku, klik foto → paku tertancap, foto jadi jelas, emoji perayaan,
 * dan judul terkunci jadi "Desainer Pilihan Rakyat". Sekali coblos, seperti di bilik suara.
 */
export function HeroCoblos() {
  // Posisi paku dalam persen terhadap foto; null = belum dicoblos
  const [paku, setPaku] = useState<{ x: number; y: number } | null>(null);
  const tercoblos = paku !== null;
  const refFoto = useRef<HTMLButtonElement>(null);

  function coblos(e: React.MouseEvent<HTMLButtonElement>) {
    if (tercoblos) return;
    // Menambah jumlah dukungan (hanya sekali per browser)
    dukung();
    // Klik lewat keyboard (detail 0) tidak punya posisi kursor: tancapkan di tengah
    if (e.detail === 0) return setPaku({ x: 50, y: 50 });
    const kotak = e.currentTarget.getBoundingClientRect();
    setPaku({
      x: ((e.clientX - kotak.left) / kotak.width) * 100,
      y: ((e.clientY - kotak.top) / kotak.height) * 100,
    });
  }

  // Kembali ke kondisi semula; fokus pindah ke foto karena tombol reset ikut hilang
  function ulangi() {
    cabut();
    setPaku(null);
    refFoto.current?.focus();
  }

  return (
    <>
      <div className={styles.wadahFoto} data-tercoblos={tercoblos}>
        <button
          ref={refFoto}
          type="button"
          className={styles.foto}
          onClick={coblos}
          aria-pressed={tercoblos}
          aria-label={tercoblos ? "Foto Tito Hanafi, sudah dicoblos" : "Coblos foto Tito Hanafi"}
        >
          <Image src={site.fotoAsli} alt="" width={320} height={320} priority unoptimized sizes="160px" />
          <Image
            src={site.foto}
            alt=""
            width={320}
            height={320}
            priority
            unoptimized
            sizes="160px"
            className={styles.fotoPiksel}
          />
        </button>

        {paku && (
          <>
            {/* Paku tertancap: ujungnya masuk ke foto, titik masuknya tepat di posisi klik */}
            <svg
              className={styles.paku}
              style={{ left: `${paku.x}%`, top: `${paku.y}%` }}
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="9" cy="23" r="2.2" fill="rgba(0,0,0,0.3)" />
              <g stroke="#fff" strokeLinecap="round">
                {/* Outline putih agar paku terlihat di atas foto */}
                <path d="M9 23 L21 11" strokeWidth="5.5" />
                <path d="M17 7 L25 15" strokeWidth="7.5" />
              </g>
              <path d="M9 23 L21 11" stroke="#6b6a66" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M17 7 L25 15" stroke="#121211" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
            {/* Badge centang di tepi kanan-bawah lingkaran */}
            <span className={styles.centang} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M4 8.5 L7 11.5 L12 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <button type="button" className={styles.reset} onClick={ulangi} aria-label="Batalkan coblos">
              <span aria-hidden="true">↺</span> Ulangi
            </button>
            <span className={styles.ledakan} aria-hidden="true">
              {perayaan.map(([emoji, x, y], i) => (
                <span key={i} style={{ "--x": `${x}em`, "--y": `${y}em` } as React.CSSProperties}>
                  {emoji}
                </span>
              ))}
            </span>
          </>
        )}
      </div>

      <h1 id="hero-judul" className={styles.judul}>
        <span className={styles.sapaan}>{hero.sapaan}</span>
        <span className={styles.julukan}>
          {hero.julukan.awal}{" "}
          <KataDinamis
            kata={hero.julukan.kata}
            intervalMs={hero.intervalGantiMs}
            kataAkhir={hero.julukan.kataPilihan}
            kunci={tercoblos}
          />{" "}
          {hero.julukan.akhir}
        </span>
      </h1>
    </>
  );
}
