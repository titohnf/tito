"use client";

import { useEffect, useState } from "react";

/** Lama angka berganti-ganti sebelum berhenti di nilai aslinya. */
const DURASI = 700;
/** Jarak antar pergantian angka. ~45ms = cukup cepat untuk terbaca berputar, belum berkedip. */
const JEDA = 45;
/** Selisih mulai antar kartu, supaya keempatnya tidak berhenti berbarengan. */
const TUNDA_PER_KARTU = 90;

/** Angka acak dengan jumlah digit yang sama, jadi lebar kolomnya tidak berubah saat berputar. */
function acak(contoh: string) {
  let hasil = String(1 + Math.floor(Math.random() * 9));
  for (let i = 1; i < contoh.length; i++) hasil += Math.floor(Math.random() * 10);
  return hasil;
}

/**
 * Angka pencapaian yang berganti cepat sesaat setelah halaman dimuat, lalu
 * berhenti di nilai aslinya — seperti papan skor yang sedang mengunci angka.
 *
 * Yang dirender di server tetap nilai aslinya (jadi tanpa JS pun angkanya benar
 * dan tidak ada ketidakcocokan saat hydrate); perputarannya baru dimulai di
 * useEffect. Animasi dilewati kalau pengunjung meminta gerakan dikurangi.
 */
export function AngkaGulir({ nilai, urutan = 0 }: { nilai: string; urutan?: number }) {
  const [tampil, setTampil] = useState(nilai);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let putar: ReturnType<typeof setInterval>;
    let berhenti: ReturnType<typeof setTimeout>;
    const mulai = setTimeout(() => {
      putar = setInterval(() => setTampil(acak(nilai)), JEDA);
      berhenti = setTimeout(() => {
        clearInterval(putar);
        setTampil(nilai);
      }, DURASI);
    }, urutan * TUNDA_PER_KARTU);

    return () => {
      clearTimeout(mulai);
      clearTimeout(berhenti);
      clearInterval(putar);
      setTampil(nilai);
    };
  }, [nilai, urutan]);

  return <>{tampil}</>;
}
