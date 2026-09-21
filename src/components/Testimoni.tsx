"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { linkWhatsApp } from "@/config/site";
import { testimoni, kepala, notaKosong, type Testimoni as Kesan } from "@/content/testimoni";
import { TombolLove } from "./TombolLove";
import styles from "./Testimoni.module.css";

/** Nota yang ditempel pengunjung, disimpan di browsernya sendiri. */
const KUNCI = "tito:nota-saya";

/** Fisher-Yates: salinan acak, daftar aslinya tidak ikut berubah. */
function acak<T>(daftar: T[]): T[] {
  const hasil = [...daftar];
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

/** Pesan WhatsApp dari satu nota. */
function pesanWhatsApp(kesan: Kesan) {
  return `Halo Tito, ini kesan saya:\n\n“${kesan.kutipan}”\n\n— ${kesan.nama || "(tanpa nama)"}`;
}

type NotaSaya = Kesan & { id: string };

function bacaNotaSaya(): NotaSaya[] {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI) ?? "[]");
    return Array.isArray(isi) ? isi : [];
  } catch {
    return [];
  }
}

function simpanNotaSaya(daftar: NotaSaya[]) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(daftar));
  } catch {
    // Penyimpanan diblokir (mode penyamaran): notanya tetap tampil sampai halaman ditutup
  }
}

/**
 * Papan sticky note yang bisa digeser ke samping.
 * Pola geseran & tombol panahnya sama dengan Sorotan: scroll-snap bawaan browser
 * (swipe dan keyboard tetap jalan), panah cuma pintasan dan ikut hilang kalau
 * semua nota sudah muat. Nota terakhir kosong — yang ditulis pengunjung langsung
 * menempel di papan ini, tersimpan di browsernya sendiri.
 * Tersembunyi otomatis selama belum ada testimoni di src/content/testimoni.ts
 */
export function Testimoni() {
  const trekRef = useRef<HTMLUListElement>(null);
  const [posisi, setPosisi] = useState({ bisaKiri: false, bisaKanan: false });
  // Dibaca setelah render pertama supaya hasil render server & klien sama
  const [notaSaya, setNotaSaya] = useState<NotaSaya[]>([]);
  // Urutan diacak di klien, bukan saat render: kalau diacak di render, hasil
  // server dan klien berbeda dan React menolak hidrasinya.
  const [urutan, setUrutan] = useState<Kesan[]>(testimoni);

  useEffect(() => {
    setNotaSaya(bacaNotaSaya());
    setUrutan(acak(testimoni));
  }, []);

  const ukur = useCallback(() => {
    const trek = trekRef.current;
    if (!trek) return;
    const sisaKanan = trek.scrollWidth - trek.clientWidth - trek.scrollLeft;
    setPosisi({ bisaKiri: trek.scrollLeft > 8, bisaKanan: sisaKanan > 8 });
  }, []);

  useEffect(() => {
    const trek = trekRef.current;
    if (!trek) return;
    ukur();
    trek.addEventListener("scroll", ukur, { passive: true });
    const observer = new ResizeObserver(ukur);
    observer.observe(trek);
    return () => {
      trek.removeEventListener("scroll", ukur);
      observer.disconnect();
    };
  }, [ukur]);

  /** Geser satu nota (termasuk jaraknya) per klik. */
  const geser = (arah: 1 | -1) => {
    const trek = trekRef.current;
    if (!trek) return;

    const pertama = trek.firstElementChild as HTMLElement | null;
    const jarak = parseFloat(getComputedStyle(trek).columnGap) || 16;
    const langkah = pertama ? pertama.getBoundingClientRect().width + jarak : trek.clientWidth * 0.8;

    const maks = trek.scrollWidth - trek.clientWidth;
    const mulai = trek.scrollLeft;
    const tujuan = Math.max(0, Math.min(maks, mulai + arah * langkah));
    if (Math.abs(tujuan - mulai) < 1) return;

    const halus = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (halus) trek.scrollTo({ left: tujuan, behavior: "smooth" });
    else trek.scrollLeft = tujuan;

    // Jaring pengaman kalau smooth scroll tidak menggerakkan apa pun.
    setTimeout(() => {
      if (Math.abs(trek.scrollLeft - mulai) < 1) trek.scrollLeft = tujuan;
      ukur();
    }, 120);
    setTimeout(ukur, 500);
  };

  function tempel(kesan: Kesan) {
    const baru = [...notaSaya, { ...kesan, id: `${Date.now()}` }];
    setNotaSaya(baru);
    simpanNotaSaya(baru);
    // Dibuka langsung di dalam penanganan klik — kalau ditunda (mis. ke dalam
    // requestAnimationFrame di bawah), browser menganggapnya pop-up dan memblokirnya.
    window.open(linkWhatsApp(pesanWhatsApp(kesan)), "_blank", "noopener,noreferrer");
    // Nota baru menempel tepat sebelum nota kosong: geser ke ujung supaya terlihat
    requestAnimationFrame(() => {
      const trek = trekRef.current;
      if (!trek) return;
      trek.scrollTo({ left: trek.scrollWidth, behavior: "smooth" });
      setTimeout(ukur, 500);
    });
  }

  function copot(id: string) {
    const sisa = notaSaya.filter((n) => n.id !== id);
    setNotaSaya(sisa);
    simpanNotaSaya(sisa);
    setTimeout(ukur, 0);
  }

  if (testimoni.length === 0) return null;

  const adaPanah = posisi.bisaKiri || posisi.bisaKanan;

  return (
    <section className={styles.testimoni} aria-labelledby="testimoni-judul">
      <div className="wadah">
        <h2 id="testimoni-judul" className={styles.judul}>
          {kepala.judul}
        </h2>

        <ul ref={trekRef} className={styles.trek}>
          {urutan.map((t, i) => (
            // Warna & kemiringan tiap nota diputar lewat data-nota (0-4), jadi
            // urutannya tetap rapi walau daftarnya ditambah/dikurangi.
            <li key={`${t.nama}-${i}`} className={styles.item}>
              <figure className={styles.nota} data-nota={i % 5}>
                <blockquote className={styles.kutipan}>{t.kutipan}</blockquote>
                <figcaption className={styles.orang}>
                  <span className={styles.nama}>{t.nama}</span>
                  {t.peran && <span className={styles.peran}>{t.peran}</span>}
                </figcaption>
                {/* Hanya testimoni resmi yang bisa di-love. Nota tulisan pengunjung
                    cuma ada di browsernya sendiri, jadi tidak ada yang bisa ikut menyukainya. */}
                {t.id && (
                  <div className={styles.aksiNota}>
                    <TombolLove id={`testimoni:${t.id}`} label={`testimoni dari ${t.nama}`} />
                  </div>
                )}
              </figure>
            </li>
          ))}

          {notaSaya.map((n, i) => (
            <li key={n.id} className={styles.item}>
              <figure className={styles.nota} data-nota={(testimoni.length + i) % 5}>
                <button
                  type="button"
                  className={styles.copot}
                  onClick={() => copot(n.id)}
                  aria-label={`Copot notamu: ${n.kutipan.slice(0, 40)}…`}
                  title="Copot nota ini"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <blockquote className={styles.kutipan}>{n.kutipan}</blockquote>
                <figcaption className={styles.orang}>
                  <span className={styles.nama}>{n.nama || notaKosong.penanda}</span>
                  <a
                    className={styles.kirim}
                    href={linkWhatsApp(pesanWhatsApp(n))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {notaKosong.tautanKirim} <span aria-hidden="true">→</span>
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}

          <li className={styles.item}>
            <NotaKosong onTempel={tempel} />
          </li>
        </ul>

        {adaPanah && (
          <div className={styles.panah}>
            <button
              type="button"
              className={styles.tombolPanah}
              onClick={() => geser(-1)}
              disabled={!posisi.bisaKiri}
              aria-label="Testimoni sebelumnya"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className={styles.tombolPanah}
              onClick={() => geser(1)}
              disabled={!posisi.bisaKanan}
              aria-label="Testimoni berikutnya"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Nota kosong: pengunjung menulis kesannya, "Tempel" langsung menempelkannya
 * di papan. Yang ditempel hanya tersimpan di browser pengunjung itu sendiri —
 * tidak terkirim ke mana-mana dan tidak terlihat pengunjung lain. Testimoni yang
 * mau ikut tampil untuk semua orang tetap ditambahkan ke src/content/testimoni.ts.
 */
function NotaKosong({ onTempel }: { onTempel: (kesan: Kesan) => void }) {
  const [teks, setTeks] = useState("");
  const [nama, setNama] = useState("");

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (!teks.trim()) return;
    onTempel({ kutipan: teks.trim(), nama: nama.trim() });
    setTeks("");
    setNama("");
  }

  return (
    <form className={`${styles.nota} ${styles.notaKosong}`} onSubmit={kirim}>
      <p className={styles.ajakan}>{notaKosong.ajakan}</p>

      <textarea
        className={styles.isian}
        value={teks}
        onChange={(e) => setTeks(e.target.value)}
        placeholder={notaKosong.placeholderKutipan}
        rows={3}
        maxLength={280}
        aria-label={notaKosong.ajakan}
      />

      <div className={styles.kakiNota}>
        <input
          className={styles.isianNama}
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder={notaKosong.placeholderNama}
          maxLength={60}
          aria-label="Nama kamu"
        />
        <button type="submit" className={styles.tombolTempel} disabled={teks.trim().length === 0}>
          {notaKosong.tombol}
        </button>
      </div>
    </form>
  );
}
