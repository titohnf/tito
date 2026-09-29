/**
 * Kartu portofolio di beranda, dikelompokkan. Judul/teks/href ditulis manual
 * (bukan digenerate dari laporan-kerja.ts) supaya urutan dan pengelompokannya
 * bisa beda dari logika `segmen` yang dipakai /rekam-jejak.
 */
export type KartuPortofolio = {
  judul: string;
  teks: string;
  href: string;
  gambar?: string;
  /** Bingkai pertama `gambar` (kalau gif), tampil diam sampai kartunya di-hover. */
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

export const portofolio: KelompokPortofolio[] = [
  {
    judul: "Contoh nyata untuk usaha kecil",
    kartu: [
      {
        judul: "Profil Siswa & Status Tagihan",
        teks: "Dari pencatatan manual jadi serba digital, dibangun dari nol untuk bimbel keluarga sendiri. Bukan klien berbayar, tapi cara kerjanya sama.",
        href: "/rekam-jejak/bimbel-tera",
        // Rekaman layar sistem beneran (data dummy, bukan siswa asli).
        gambar: "/videos/bimbel-tera-preview.gif",
        poster: "/videos/bimbel-tera-preview-poster.png",
      },
      {
        judul: "Latihan Mandiri per Topik",
        teks: "Siswa bisa berlatih soal sendiri per topik pelajaran, dengan pembahasan langsung tanpa perlu nunggu tutor.",
        href: "/rekam-jejak/bimbel-tera",
        // Rekaman layar sistem beneran (akun dummy, bukan siswa asli), ukuran mobile.
        gambar: "/videos/belajar-mandiri-preview.gif",
        poster: "/videos/belajar-mandiri-preview-poster.png",
        mobile: true,
      },
    ],
  },
];
