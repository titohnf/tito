/**
 * Konten halaman /tera — "Membangun Tera".
 * Halaman ini masih kerangka. Isi setiap bagian di sini; bagian yang kosong
 * otomatis tampil sebagai placeholder.
 */
import { membangunTera } from "./profil";

export type BabCerita = {
  judul: string;
  isi: string[]; // satu string = satu paragraf; kosong = "sedang ditulis"
};

export type Screenshot = {
  judul: string;
  gambar?: string; // path di /public, mis. "/images/tera-dashboard.png"
  varian?: "dashboard" | "website"; // bentuk placeholder selama gambar kosong
};

export type Eksperimen = {
  judul: string;
  cerita: string;
  pelajaran?: string;
};

export const tera = {
  label: membangunTera.label,
  judul: membangunTera.judul,
  intro: membangunTera.paragraf,

  // TODO: judul bab di bawah masih usulan — silakan ganti sesuai cerita asli
  cerita: [
    { judul: "Kenapa desain saja tidak cukup", isi: [] },
    { judul: "Sistem internal untuk operasional bimbel", isi: [] },
    { judul: "Membangun website Tera", isi: [] },
  ] as BabCerita[],

  screenshot: [
    { judul: "Sistem internal bimbel", varian: "dashboard" },
    { judul: "Website Tera", varian: "website" },
  ] as Screenshot[],

  // TODO: isi dengan eksperimen yang gagal. Selama kosong, tampil kartu placeholder.
  gagal: [] as Eksperimen[],
};
