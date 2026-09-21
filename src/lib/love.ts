import { useEffect, useSyncExternalStore } from "react";

/**
 * State "love" per item, dipakai bersama semua tombol di halaman.
 *
 * Dua hal yang dijaga di sini:
 * 1. Semua tombol yang muncul di satu halaman dikumpulkan dulu, lalu diambil
 *    angkanya dalam SATU request. Tanpa ini, halaman berisi 15 kartu = 15 request
 *    dan kuota Upstash cepat habis.
 * 2. Satu browser hanya bisa memberi 1 love per item, ditandai lewat localStorage.
 *    Gampang diakali (ganti browser), tapi cukup untuk situs ini.
 */

const TANDA = "tito:love";

const jumlah: Record<string, number> = {};
let sendiri = new Set<string>();
let sudahDimuat = false;

// Snapshot untuk useSyncExternalStore: angka yang naik tiap kali ada perubahan.
// Objek `jumlah` dibaca langsung saat render, jadi snapshot-nya cukup primitif
// dan tidak memicu "getSnapshot should be cached".
let versi = 0;
const pendengar = new Set<() => void>();

function kabari() {
  versi++;
  pendengar.forEach((f) => f());
}

function langganan(f: () => void) {
  pendengar.add(f);
  return () => {
    pendengar.delete(f);
  };
}

function muat() {
  if (sudahDimuat) return;
  sudahDimuat = true;
  try {
    const isi = JSON.parse(localStorage.getItem(TANDA) ?? "[]");
    if (Array.isArray(isi)) sendiri = new Set(isi.filter((x) => typeof x === "string"));
  } catch {
    // localStorage diblokir: love tetap jalan, cuma tidak diingat antar kunjungan
  }
  kabari();
}

function simpan() {
  try {
    localStorage.setItem(TANDA, JSON.stringify([...sendiri]));
  } catch {
    // sama seperti di atas: diabaikan
  }
}

// --- Pengambilan angka, dikumpulkan dulu baru dikirim sekali ---

const antre = new Set<string>();
let timer: ReturnType<typeof setTimeout> | null = null;

async function ambil() {
  timer = null;
  const ids = [...antre];
  antre.clear();
  if (ids.length === 0) return;

  try {
    const res = await fetch(`/api/love?ids=${ids.join(",")}`, { cache: "no-store" });
    if (!res.ok) return;
    Object.assign(jumlah, await res.json());
    kabari();
  } catch {
    // Jaringan gagal: tombol tetap tampil, angkanya saja yang belum ada
  }
}

/** Daftarkan satu item supaya angkanya ikut diambil di request berikutnya. */
function daftarkan(id: string) {
  muat();
  if (id in jumlah || antre.has(id)) return;
  antre.add(id);
  // Nol detik: semua tombol di halaman sempat mendaftar dalam tick yang sama,
  // jadi semuanya terangkut dalam satu request.
  if (!timer) timer = setTimeout(ambil, 0);
}

function ubah(id: string) {
  const menyukai = !sendiri.has(id);
  if (menyukai) sendiri.add(id);
  else sendiri.delete(id);
  simpan();

  // Tampilkan perubahan langsung, lalu samakan dengan angka dari server
  jumlah[id] = Math.max(0, (jumlah[id] ?? 0) + (menyukai ? 1 : -1));
  kabari();

  fetch("/api/love", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, aksi: menyukai ? "love" : "batal" }),
  })
    .then(async (res) => {
      if (!res.ok) return;
      jumlah[id] = (await res.json()).jumlah;
      kabari();
    })
    .catch(() => {
      // Biarkan angka hasil perkiraan yang tampil
    });
}

/**
 * Angka love satu item beserta status browser ini.
 * `jumlah` null selama angkanya belum termuat — komponen yang memutuskan
 * mau menampilkan apa selama itu.
 */
export function useLove(id: string) {
  useEffect(() => daftarkan(id), [id]);
  useSyncExternalStore(
    langganan,
    () => versi,
    () => 0,
  );

  return {
    jumlah: id in jumlah ? jumlah[id] : null,
    disukai: sendiri.has(id),
    ubah: () => ubah(id),
  };
}
