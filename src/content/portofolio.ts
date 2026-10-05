/**
 * Kartu portofolio di beranda, dikelompokkan. Judul/teks/href ditulis manual
 * (bukan digenerate dari laporan-kerja.ts) supaya urutan dan pengelompokannya
 * bisa beda dari logika `segmen` yang dipakai /rekam-jejak.
 */
export type KartuPortofolio = {
  /** Label kecil di atas judul kartu, mis. tahun ("2020"). */
  label?: string;
  judul: string;
  /** Alamat halaman detail studi kasus: /studi-kasus/<slug>. */
  slug: string;
  /** Label kategori kecil (pill) di samping tahun, mis. "Design System". */
  tag?: string[];
  teks?: string;
  /** Logo aplikasi: ikon kotak kecil di kiri judul kartu. */
  logo?: string;
  /** Alamat situs aslinya, ditampilkan sebagai tombol di halaman detail (dibuka di tab baru). */
  situs?: string;
  /** Penjelasan singkat di bawah judul kartu. */
  deskripsi?: string;
  gambar?: string;
  /** Bingkai diam: tampil di `gambar` (gif) sampai di-hover, atau jadi `poster` <video> sebelum videonya termuat. */
  poster?: string;
  /** Preview video singkat (autoplay, mute, loop) menggantikan `gambar` kalau diisi. */
  video?: string;
  /**
   * Pratinjau animasi CSS sementara (bukan rekaman beneran) yang mensimulasikan
   * sistemnya bekerja. Dipakai kalau belum ada `video`/`gambar` — ganti ke
   * `video` begitu ada rekaman layar sistem yang asli.
   */
  pratinjau?: boolean;
  /** Rekamannya berbentuk potret HP (bukan lebar 16:9), tampil sebagai mockup ponsel. */
  mobile?: boolean;
};

export type KelompokPortofolio = {
  judul: string;
  /** Satu kalimat penjembatan opsional di bawah judul kelompok. */
  deskripsi?: string;
  kartu: KartuPortofolio[];
};

/**
 * Satu segmen Rekam Jejak di beranda: judul, deretan pil (instansi/perusahaan)
 * di bawahnya, tombol opsional di kanan judul, lalu kartu-kartunya.
 */
export type SegmenPortofolio = {
  id: string;
  /** Label kecil di atas judul; cukup di segmen pertama, segmen berikutnya masih bagian dari label yang sama. */
  label?: string;
  judul: string;
  /** Tema warna latar kartu yang tidak aktif: bawaan biru muda, atau gradien merah ke putih. */
  tema?: "merah";
  /** Pil di bawah judul, mis. nama perusahaan atau instansi. */
  pil: string[];
  /** Tombol opsional sejajar judul (dibuka di tab baru). */
  tombol?: { label: string; href: string };
  kelompok: KelompokPortofolio[];
  /** Satu kalimat penutup di bawah kartu-kartu segmen. */
  penutup?: string;
};

const kelompokBimbel: KelompokPortofolio[] = [
  {
    judul: "Contoh nyata untuk usaha kecil",
    kartu: [
      {
        judul: "Dasbor tutor dan orang tua",
        slug: "dasbor-tutor-orang-tua",
        tag: ["Usaha"],
        deskripsi: "Dari progres siswa hingga status pembayaran, semua tercatat dengan jelas.",
        teks: "Dari pencatatan manual jadi serba digital, dibangun dari nol untuk bimbel keluarga sendiri. Bukan klien berbayar, tapi cara kerjanya sama.",
        // Rekaman layar sistem beneran (data dummy, bukan siswa asli).
        video: "/videos/bimbel-tera-preview.mp4",
        poster: "/videos/bimbel-tera-poster.webp",
      },
      {
        judul: "Website Bimbel Tera",
        slug: "website-bimbel-tera",
        tag: ["Usaha"],
        deskripsi: "Menampilkan informasi seputar bimbel",
        teks: "Website bimbel yang dibangun sendiri, dari beranda sampai bagian bawah.",
        situs: "https://bimbeltera.com",
        // Rekaman scroll beranda bimbeltera.com (situs asli, bukan data siswa).
        video: "/videos/bimbeltera-scroll.webm",
        poster: "/videos/bimbeltera-scroll-poster.webp",
      },
    ],
  },
];

const kelompokAplikasiBelajar: KelompokPortofolio[] = [
  {
    judul: "Aplikasi untuk siswa",
    kartu: [
      {
        judul: "Aplikasi belajar siswa",
        slug: "aplikasi-belajar-siswa",
        tag: ["Usaha"],
        deskripsi: "Siswa dapat belajar mandiri di rumah",
        teks: "Dari portal keluarga, anak bisa memilih mapel dan topik lalu membaca materinya sendiri, kapan saja tanpa perlu nunggu tutor.",
        // Rekaman layar portal keluarga beneran (akun & siswa dummy, bukan siswa asli), ukuran mobile.
        video: "/videos/belajar-mandiri-preview.mp4",
        poster: "/videos/belajar-mandiri-poster.webp",
        mobile: true,
      },
      {
        judul: "Aplikasi latihan soal",
        slug: "aplikasi-latihan-soal",
        tag: ["Usaha"],
        deskripsi: "Desain soal interaktif sesuai kebutuhan",
        teks: "Tes berhitung, dari nilai tempat. Tiap soal dijawab langsung di HP.",
        // Rekaman layar soal 1–5 Tes Fondasi Digital (halaman soal dijalankan lokal, bukan data siswa asli).
        video: "/videos/tes-fondasi-preview.webm",
        poster: "/videos/tes-fondasi-poster.webp",
        mobile: true,
      },
    ],
  },
];

export const segmenPortofolio: SegmenPortofolio[] = [
  {
    id: "bimbel",
    judul: "Membangun sistem bimbel 📚",
    pil: ["PT. Sinergi Cendikia Indonesia"],
    kelompok: kelompokBimbel,
  },
  {
    id: "aplikasi-belajar",
    judul: "Membangun aplikasi belajar 📱",
    pil: ["PT. Sinergi Cendikia Indonesia"],
    kelompok: kelompokAplikasiBelajar,
  },
];

/** Semua kartu studi kasus dari seluruh segmen, dipakai beranda, halaman detail, dan sitemap. */
export function kartuStudiKasus(): KartuPortofolio[] {
  return segmenPortofolio.flatMap((s) => s.kelompok.flatMap((g) => g.kartu));
}
