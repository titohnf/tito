/**
 * Kartu portofolio di beranda, dikelompokkan. Judul/teks/href ditulis manual
 * (bukan digenerate dari laporan-kerja.ts) supaya urutan dan pengelompokannya
 * bisa beda dari logika `segmen` yang dipakai /rekam-jejak.
 */
export type KartuPortofolio = {
  /** Label kecil di atas judul kartu, mis. tahun ("2020"). */
  label?: string;
  judul: string;
  teks?: string;
  href: string;
  /** Logo aplikasi: ikon kotak kecil di kiri judul kartu. */
  logo?: string;
  /** Alamat situs: tombol "Kunjungi web" di kanan bilah judul (dibuka di tab baru). */
  web?: string;
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
};

const kelompokBimbel: KelompokPortofolio[] = [
  {
    judul: "Contoh nyata untuk usaha kecil",
    kartu: [
      {
        judul: "Dasbor tutor dan orang tua",
        deskripsi: "Dari progres siswa hingga status pembayaran, semua tercatat dengan jelas.",
        teks: "Dari pencatatan manual jadi serba digital, dibangun dari nol untuk bimbel keluarga sendiri. Bukan klien berbayar, tapi cara kerjanya sama.",
        href: "/rekam-jejak/bimbel-tera",
        // Rekaman layar sistem beneran (data dummy, bukan siswa asli).
        video: "/videos/bimbel-tera-preview.mp4",
        poster: "/videos/bimbel-tera-poster.webp",
      },
      {
        judul: "Aplikasi belajar siswa",
        deskripsi: "Siswa dapat belajar mandiri di rumah",
        teks: "Dari portal keluarga, anak bisa memilih mapel dan topik lalu membaca materinya sendiri, kapan saja tanpa perlu nunggu tutor.",
        href: "/rekam-jejak/bimbel-tera",
        // Rekaman layar portal keluarga beneran (akun & siswa dummy, bukan siswa asli), ukuran mobile.
        video: "/videos/belajar-mandiri-preview.mp4",
        poster: "/videos/belajar-mandiri-poster.webp",
        mobile: true,
      },
      {
        judul: "Website Bimbel Tera",
        deskripsi: "Menampilkan informasi seputar bimbel",
        teks: "Website bimbel yang dibangun sendiri, dari beranda sampai bagian bawah.",
        href: "https://bimbeltera.com",
        // Rekaman scroll beranda bimbeltera.com (situs asli, bukan data siswa).
        video: "/videos/bimbeltera-scroll.webm",
        poster: "/videos/bimbeltera-scroll-poster.webp",
      },
      {
        judul: "Aplikasi latihan soal",
        deskripsi: "Desain soal interaktif sesuai kebutuhan",
        teks: "Tes berhitung, dari nilai tempat. Tiap soal dijawab langsung di HP.",
        href: "/rekam-jejak/bimbel-tera",
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
    id: "super-app",
    label: "Rekam Jejak",
    judul: "Mendesain super app pemerintah 🇮🇩",
    tema: "merah",
    pil: ["Pemprov DKI Jakarta", "Peruri", "Kemendikdasmen"],
    kelompok: [
      {
        judul: "Super app pemerintah",
        kartu: [
          // Tangkapan layar aplikasi (rasio potret). Boleh diganti `video` + `poster`
          // kalau nanti ada rekaman layarnya.
          {
            label: "2025",
            judul: "Rumah Pendidikan",
            deskripsi: "Design Manager INA Digital Edu",
            href: "/rekam-jejak/rumah-pendidikan",
            gambar: "/images/rumah-pendidikan-kartu.webp",
            logo: "/images/rumah-pendidikan-logo.webp",
            web: "https://rumah.pendidikan.go.id/",
            mobile: true,
          },
          {
            label: "2024",
            judul: "INAku",
            deskripsi: "Lead UX Designer INA Digital",
            href: "/rekam-jejak/inaku",
            gambar: "/images/inaku-kartu.webp",
            logo: "/images/inaku-logo.webp",
            web: "https://inaku.go.id/",
            mobile: true,
          },
          {
            label: "2020",
            judul: "Jakarta Kini (JAKI)",
            deskripsi: "Lead UI/UX Designer JSC",
            href: "/rekam-jejak/redesain-jaki",
            gambar: "/images/jaki-kartu.webp",
            logo: "/images/jaki-logo.webp",
            web: "https://jaki.jakarta.go.id/",
            mobile: true,
          },
        ],
      },
    ],
  },
  {
    id: "bimbel",
    judul: "Membangun sistem bimbel 📚",
    pil: ["PT. Sinergi Cendikia Indonesia"],
    kelompok: kelompokBimbel,
  },
];
