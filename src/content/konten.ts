/**
 * Konten segmen "Apa yang Saya Pikirkan".
 *
 * Cara menambah konten: tambahkan objek baru ke array `konten` di bawah.
 *   - tulisan   → kartu besar, klik membuka /tulisan/[slug]
 *   - pemikiran → catatan pendek 1–2 kalimat, tampil langsung
 *   - video     → thumbnail YouTube, klik membuka YouTube di tab baru
 *
 * Item dengan `contoh: true` hanya tampil kalau `site.tampilkanContoh` = true.
 */
import { site } from "@/config/site";
import type { Segmen } from "./segmen";

type Dasar = {
  tanggal: string; // format YYYY-MM-DD
  contoh?: boolean;
  // Tag peran (Perwakilan / Pelayan / Pendamping) yang tampil di kartu.
  segmen?: Segmen[];
};

/**
 * Kunci penghitung love. WAJIB dan SEKALI SEUMUR HIDUP: begitu kontennya tayang,
 * nilai ini tidak boleh diubah lagi. Judul dan slug boleh diganti kapan saja —
 * kunci ini sengaja terpisah supaya angka love-nya tidak ikut hilang.
 */
type BerLove = { kunci: string };

export type Tulisan = Dasar &
  BerLove & {
  tipe: "tulisan";
  slug: string;
  judul: string;
  pengantar: string;
  menitBaca: number;
  gambar?: string; // path di /public, opsional
  isi: string[]; // satu string = satu paragraf
};

export type Pemikiran = Dasar &
  BerLove & {
    tipe: "pemikiran";
    id: string;
    teks: string;
  };

export type Video = Dasar & {
  tipe: "video";
  id: string;
  judul: string;
  youtubeId: string; // bagian setelah ?v= di URL YouTube
  durasi?: string;
};

export type Konten = Tulisan | Pemikiran | Video;
export type TipeKonten = Konten["tipe"];

export const konten: Konten[] = [
  {
    tipe: "tulisan",
    kunci: "usaha-kampus",
    slug: "kurang-nasionalisme-apa-coba",
    judul: "Kurang nasionalisme apa coba, saya sempat bikin dua usaha kampus",
    pengantar:
      "Sebelum masuk ke pemerintahan, saya sempat coba dua usaha bertema nasionalisme waktu kuliah. Ini ceritanya.",
    menitBaca: 1, // sesuaikan setelah cerita dilanjutkan
    tanggal: "2026-09-14",
    segmen: ["pendamping"],
    isi: [
      'Membaca buku "Indonesia di tanganmu" —oleh-oleh yang saya terima setelah mengikuti pelatihan penerima beasiswa— sepertinya menjadi pemicu jiwa nasionalisme dalam diri saya muncul. Ketika kuliah saya dan teman-teman mendirikan "Garuda Creative" (digital agency untuk UMKM) dan "Indonesia Positif" (portal berita baik tentang Indonesia). Kurang nasionalisme apa coba? Haha.',
      "Garuda Creative sempat jadi salah satu usaha mahasiswa yang memenangkan kompetisi dan mendapatkan permodalan dari kampus.",
      // TODO: lanjutkan cerita di sini — bagaimana akhirnya Garuda Creative dan
      // Indonesia Positif berjalan. Tambahkan satu string per paragraf.
    ],
  },

  // ——— CONTOH (hapus/ganti saat konten asli sudah ada) ———
  {
    tipe: "pemikiran",
    kunci: "contoh-1",
    contoh: true,
    id: "contoh-pemikiran-1",
    teks: "Contoh catatan pendek. Satu-dua kalimat yang terlintas, langsung terbaca tanpa perlu diklik.",
    tanggal: "2026-09-08",
    segmen: ["perwakilan"],
  },
  {
    tipe: "video",
    contoh: true,
    id: "contoh-video-1",
    judul: "Judul video YouTube akan muncul di sini",
    youtubeId: "",
    durasi: "12:34",
    tanggal: "2026-09-05",
    segmen: ["pelayan"],
  },
  {
    tipe: "pemikiran",
    kunci: "contoh-2",
    contoh: true,
    id: "contoh-pemikiran-2",
    teks: "Catatan pendek kedua, supaya kelihatan bagaimana beberapa kartu kecil tersusun di grid.",
    tanggal: "2026-09-02",
  },
  {
    tipe: "tulisan",
    kunci: "contoh-tulisan-2",
    contoh: true,
    slug: "contoh-tulisan-kedua",
    judul: "Tulisan kedua, judulnya bisa agak panjang sampai dua baris",
    pengantar: "Pengantar singkat untuk tulisan kedua.",
    menitBaca: 4,
    tanggal: "2026-08-28",
    segmen: ["perwakilan", "pelayan"],
    isi: ["Paragraf contoh untuk tulisan kedua."],
  },
  {
    tipe: "video",
    contoh: true,
    id: "contoh-video-2",
    judul: "Video contoh kedua",
    youtubeId: "",
    durasi: "08:02",
    tanggal: "2026-08-20",
  },
];

/** Konten yang siap ditampilkan, urut dari yang terbaru. */
export function kontenTampil(): Konten[] {
  return konten
    .filter((k) => site.tampilkanContoh || !k.contoh)
    .filter((k) => site.tipeKontenAktif.includes(k.tipe))
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function daftarTulisan(): Tulisan[] {
  return kontenTampil().filter((k): k is Tulisan => k.tipe === "tulisan");
}

/**
 * Id penghitung love satu konten. Dibentuk dari `kunci`, bukan dari judul
 * atau slug, supaya keduanya bebas diubah tanpa mengosongkan angkanya.
 */
export function idKonten(item: Tulisan | Pemikiran) {
  return `${item.tipe}:${item.kunci}`;
}

export function formatTanggal(tanggal: string) {
  return new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
