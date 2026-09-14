/**
 * Tiga persona Tito. Tiap persona punya halaman sendiri:
 *   Perwakilan → /            (default, dipakai juga untuk preview share utama)
 *   Pelayan    → /pelayan
 *   Pendamping → /pendamping
 *
 * Yang berubah per persona: julukan & fakta di hero, "Tentang saya", dan bagian karya.
 * Yang sama di semua persona: "Apa yang saya pikirkan" dan CTA ngobrol.
 */
import type { BabTentang } from "./profil";

export type PersonaId = "perwakilan" | "pelayan" | "pendamping";

export type Persona = {
  id: PersonaId;
  path: string;
  pendek: string; // teks tombol pilihan di hero
  nama: string; // dipakai di "Lihat Tito sebagai …"
  julukan: string;
  fakta: string;
  deskripsiSeo: string;
  pernahDipercaya?: { label: string; daftar: string[] };
  tentang: BabTentang[];
  karya: "laporan-kerja" | "membangun-tera" | "bantuan";
};

export const daftarPersona: Persona[] = [
  {
    id: "perwakilan",
    path: "/",
    pendek: "Perwakilan",
    nama: "Perwakilan Rakyat",
    julukan: "Desainer Perwakilan Rakyat",
    fakta: "9+ tahun dipercaya mendesain layanan digital di pemerintahan.",
    deskripsiSeo:
      "9+ tahun mendesain layanan digital di pemerintahan, lalu mendirikan yayasan pendidikan. Sekarang terbuka untuk diskusi produk atau ide yang ingin kamu kembangkan.",
    pernahDipercaya: {
      label: "Pernah dipercaya oleh",
      daftar: ["Kominfo", "Pemprov DKI Jakarta", "Peruri", "Kemendikdasmen"],
    },
    tentang: [
      {
        id: "oleh-rakyat",
        label: "Oleh Rakyat",
        judul: "9 tahun ikut mendesain sistem yang dipakai jutaan orang",
        paragraf: [
          "Pun ketika masuk ke dunia kerja, sepertinya takdir ingin saya dekat dengan pemerintah. Hampir 10 tahun konsisten menjadi tenaga ahli, mulai dari Kominfo (sekarang Komdigi), Pemprov DKI Jakarta (JSC), Peruri (INA Digital), hingga terakhir di Kemendikdasmen (INA Digital Edu).",
        ],
        funFact:
          'saya mendesain "super app" untuk 3 dari 4 instansi tersebut, 2 di antaranya mendapatkan penghargaan tingkat global.',
        tautan: { label: "Lihat laporan kerja saya", href: "laporanKerja" },
      },
    ],
    karya: "laporan-kerja",
  },
  {
    id: "pelayan",
    path: "/pelayan",
    pendek: "Pelayan",
    nama: "Pelayan Rakyat",
    julukan: "Desainer Pelayan Rakyat",
    fakta: "Mendirikan yayasan sendiri untuk pendidikan.",
    // TODO: draf — sesuaikan
    deskripsiSeo:
      "Mendirikan yayasan pendidikan Tera Inspirasi Bangsa, lalu ikut membangun sistemnya sendiri.",
    tentang: [
      {
        id: "untuk-rakyat",
        label: "Untuk Rakyat",
        judul: "Mendirikan yayasan pendidikan sendiri",
        paragraf: [
          "Melihat dan mencoba memahami permasalahan di lingkungan sekitar, masih dalam semangat berkontribusi untuk Indonesia yang lebih baik, saya mendirikan yayasan Tera Inspirasi Bangsa.",
        ],
      },
    ],
    karya: "membangun-tera",
  },
  {
    id: "pendamping",
    path: "/pendamping",
    pendek: "Pendamping",
    nama: "Pendamping Rakyat",
    julukan: "Desainer Pendamping Rakyat",
    fakta: "Sekarang, membuka diri mendampingi usaha kecil dan ide-ide baru.",
    // TODO: draf — sesuaikan
    deskripsiSeo:
      "Membuka diri mendampingi usaha kecil dan ide-ide baru. Ngobrol dulu gratis, nggak ada komitmen.",
    tentang: [
      {
        // TODO: label & headline masih draf (belum ada copy khusus persona ini)
        id: "bersama-rakyat",
        label: "Bersama Rakyat",
        judul: "Membuka diri mendampingi usaha kecil dan ide-ide baru",
        paragraf: [
          "Saat ini saya membuka diri untuk berbagi pengalaman dan kemampuan saya dalam mengembangkan produk digital yang mungkin kamu butuhkan.",
        ],
        tautan: { label: "Lihat apa yang bisa saya bantu", href: "bantuan" },
      },
    ],
    karya: "bantuan",
  },
];

export const personaDefault = daftarPersona[0];

export function cariPersona(id: string) {
  return daftarPersona.find((p) => p.id === id);
}

/** Kartu di bagian karya persona Perwakilan (mengarah ke /laporan-kerja). */
export const laporanKerja = [
  { instansi: "Kominfo", tim: "Sekarang Komdigi" },
  { instansi: "Pemprov DKI Jakarta", tim: "JSC" },
  { instansi: "Peruri", tim: "INA Digital" },
  { instansi: "Kemendikdasmen", tim: "INA Digital Edu" },
];
