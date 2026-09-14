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

type Dasar = {
  tanggal: string; // format YYYY-MM-DD
  contoh?: boolean;
};

export type Tulisan = Dasar & {
  tipe: "tulisan";
  slug: string;
  judul: string;
  pengantar: string;
  menitBaca: number;
  gambar?: string; // path di /public, opsional
  isi: string[]; // satu string = satu paragraf
};

export type Pemikiran = Dasar & {
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
    slug: "kurang-nasionalisme-apa-coba",
    judul: "Kurang nasionalisme apa coba, saya sempat bikin dua usaha kampus",
    pengantar:
      "Sebelum masuk ke pemerintahan, saya sempat coba dua usaha bertema nasionalisme waktu kuliah. Ini ceritanya.",
    menitBaca: 1, // sesuaikan setelah cerita dilanjutkan
    tanggal: "2026-09-14",
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
    contoh: true,
    id: "contoh-pemikiran-1",
    teks: "Contoh catatan pendek. Satu-dua kalimat yang terlintas, langsung terbaca tanpa perlu diklik.",
    tanggal: "2026-09-08",
  },
  {
    tipe: "video",
    contoh: true,
    id: "contoh-video-1",
    judul: "Judul video YouTube akan muncul di sini",
    youtubeId: "",
    durasi: "12:34",
    tanggal: "2026-09-05",
  },
  {
    tipe: "pemikiran",
    contoh: true,
    id: "contoh-pemikiran-2",
    teks: "Catatan pendek kedua, supaya kelihatan bagaimana beberapa kartu kecil tersusun di grid.",
    tanggal: "2026-09-02",
  },
  {
    tipe: "tulisan",
    contoh: true,
    slug: "contoh-tulisan-kedua",
    judul: "Tulisan kedua, judulnya bisa agak panjang sampai dua baris",
    pengantar: "Pengantar singkat untuk tulisan kedua.",
    menitBaca: 4,
    tanggal: "2026-08-28",
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
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function daftarTulisan(): Tulisan[] {
  return kontenTampil().filter((k): k is Tulisan => k.tipe === "tulisan");
}

export function formatTanggal(tanggal: string) {
  return new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
