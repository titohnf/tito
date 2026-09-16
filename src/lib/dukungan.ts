import { useEffect, useSyncExternalStore } from "react";

/**
 * State jumlah dukungan yang dipakai bersama oleh foto hero (yang menambah/mencabut)
 * dan teks "Didukung oleh xx rakyat" (yang menampilkan).
 * Satu browser hanya bisa menyumbang 1 dukungan, ditandai lewat localStorage.
 */

const TANDA = "tito:sudah-dukung";

let jumlah: number | null = null;
let didukung = false;
let sudahDimuat = false;
const pendengar = new Set<() => void>();

function kabari() {
  pendengar.forEach((f) => f());
}

function setJumlah(baru: number) {
  jumlah = baru;
  kabari();
}

function langganan(f: () => void) {
  pendengar.add(f);
  return () => {
    pendengar.delete(f);
  };
}

function sudahDukung() {
  try {
    return localStorage.getItem(TANDA) === "1";
  } catch {
    return false;
  }
}

async function kirim(init?: RequestInit) {
  try {
    const res = await fetch("/api/dukungan", { cache: "no-store", ...init });
    if (res.ok) setJumlah((await res.json()).jumlah);
  } catch {
    // Jaringan gagal: biarkan angka terakhir yang tampil
  }
}

function muat() {
  if (sudahDimuat) return;
  sudahDimuat = true;
  // Ditunda ke klien agar hasil render pertama sama dengan server
  didukung = sudahDukung();
  kabari();
  kirim();
}

function ubahDukungan(aksi: "dukung" | "cabut") {
  try {
    if (aksi === "dukung") localStorage.setItem(TANDA, "1");
    else localStorage.removeItem(TANDA);
  } catch {
    // localStorage tidak tersedia (mis. mode privat tertentu): tetap kirim
  }
  didukung = aksi === "dukung";
  kabari();
  // Tampilkan perubahan langsung, lalu samakan dengan angka dari server
  if (jumlah !== null) setJumlah(Math.max(0, jumlah + (aksi === "dukung" ? 1 : -1)));
  kirim({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aksi }),
  });
}

/** Tambah 1 dukungan, kecuali browser ini sudah pernah mendukung. */
export function dukung() {
  if (!sudahDukung()) ubahDukungan("dukung");
}

/** Cabut dukungan browser ini, kalau memang pernah mendukung. */
export function cabut() {
  if (sudahDukung()) ubahDukungan("cabut");
}

/** Jumlah dukungan terkini; null selama belum dimuat. */
export function useJumlahDukungan() {
  useEffect(muat, []);
  return useSyncExternalStore(
    langganan,
    () => jumlah,
    () => null,
  );
}

/** true kalau browser ini tercatat sudah mendukung; selalu false saat render server. */
export function useSudahDukung() {
  useEffect(muat, []);
  return useSyncExternalStore(
    langganan,
    () => didukung,
    () => false,
  );
}
