"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { hero } from "@/content/profil";
import { site } from "@/config/site";
import { cabut, dukung, useSudahDukung } from "@/lib/dukungan";
import { Dukungan } from "./Dukungan";
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
  // Posisi paku dalam persen terhadap foto; null = belum dicoblos di sesi ini
  const [paku, setPaku] = useState<{ x: number; y: number } | null>(null);
  // Sumber kebenaran status dukungan ada di store, bukan state lokal:
  // kunjungan berikutnya paku dipulihkan di tengah foto.
  const sudahDukung = useSudahDukung();
  const posisiPaku = sudahDukung ? (paku ?? { x: 50, y: 50 }) : null;
  const tercoblos = posisiPaku !== null;

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

  // Geseran paku dalam piksel selama diseret; null = paku diam tertancap
  const [seret, setSeret] = useState<{ x: number; y: number } | null>(null);
  const awalSeret = useRef<{ x: number; y: number } | null>(null);
  const refWadah = useRef<HTMLDivElement>(null);

  function mulaiSeret(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    awalSeret.current = { x: e.clientX, y: e.clientY };
    setSeret({ x: 0, y: 0 });
  }

  function sedangSeret(e: React.PointerEvent<HTMLButtonElement>) {
    if (!awalSeret.current) return;
    setSeret({ x: e.clientX - awalSeret.current.x, y: e.clientY - awalSeret.current.y });
  }

  /** Dilepas di luar lingkaran foto = paku tercabut; di dalam = paku kembali tertancap. */
  function selesaiSeret(e: React.PointerEvent<HTMLButtonElement>) {
    // Tangkapan pointer dilepas manual: kalau tombol paku keburu hilang dari DOM
    // sambil masih memegang pointer, kursor tersangkut di "grabbing" dan foto
    // tidak pernah kembali menampilkan kursor paku.
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const geser = awalSeret.current
      ? { x: e.clientX - awalSeret.current.x, y: e.clientY - awalSeret.current.y }
      : null;
    awalSeret.current = null;
    setSeret(null);

    const kotak = refWadah.current?.getBoundingClientRect();
    if (!geser || !kotak || !posisiPaku) return;

    // Jarak ujung paku (setelah digeser) dari pusat lingkaran foto
    const jari = kotak.width / 2;
    const x = (posisiPaku.x / 100) * kotak.width + geser.x - jari;
    const y = (posisiPaku.y / 100) * kotak.height + geser.y - jari;
    if (Math.hypot(x, y) > jari) cabutPaku();
  }

  // Cabut paku: dukungan dihentikan dan foto kembali buram
  function cabutPaku() {
    cabut();
    setPaku(null);
  }

  return (
    <>
      <div ref={refWadah} className={styles.wadahFoto} data-tercoblos={tercoblos}>
        <button
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

        {posisiPaku && (
          <>
            {/* Paku tertancap (ikon pushpin Fluent Emoji gaya flat, MIT, diwarnai ulang merah): ujungnya tepat di posisi klik.
                Diseret keluar lingkaran foto = paku tercabut dan dukungan dihentikan. */}
            <button
              type="button"
              className={styles.paku}
              data-seret={seret !== null}
              style={{
                left: `${posisiPaku.x}%`,
                top: `${posisiPaku.y}%`,
                translate: seret ? `${seret.x}px ${seret.y}px` : undefined,
              }}
              onPointerDown={mulaiSeret}
              onPointerMove={sedangSeret}
              onPointerUp={selesaiSeret}
              onPointerCancel={selesaiSeret}
              // Mouse hanya bisa lewat seret; klik keyboard (detail 0) tetap bisa mencabut
              onClick={(e) => e.detail === 0 && cabutPaku()}
              title="Seret paku keluar foto untuk menghentikan dukungan"
              aria-label="Paku dukungan. Seret keluar foto, atau tekan Enter, untuk menghentikan dukungan"
            >
              {/* draggable=false: tanpa ini browser ikut menyeret salinan gambar (paku jadi terlihat dobel) */}
              <Image
                src="/images/paku-merah.svg"
                alt=""
                width={32}
                height={32}
                unoptimized
                draggable={false}
              />
            </button>
            {/* Perayaan hanya saat benar-benar mencoblos, bukan saat dipulihkan dari kunjungan lalu */}
            {paku && (
              <span className={styles.ledakan} aria-hidden="true">
                {perayaan.map(([emoji, x, y], i) => (
                  <span key={i} style={{ "--x": `${x}em`, "--y": `${y}em` } as React.CSSProperties}>
                    {emoji}
                  </span>
                ))}
              </span>
            )}
          </>
        )}

        <Dukungan />
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
