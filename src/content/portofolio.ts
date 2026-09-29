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

export const portofolio: KelompokPortofolio[] = [
  {
    judul: "Contoh nyata untuk usaha kecil",
    kartu: [
      {
        judul: "Profil Siswa & Status Tagihan",
        teks: "Dari pencatatan manual jadi serba digital, dibangun dari nol untuk bimbel keluarga sendiri. Bukan klien berbayar, tapi cara kerjanya sama.",
        href: "/rekam-jejak/bimbel-tera",
        // Rekaman layar sistem beneran (data dummy, bukan siswa asli).
        video: "/videos/bimbel-tera-preview.mp4",
        poster: "/videos/bimbel-tera-poster.png",
      },
      {
        judul: "Belajar Mandiri per Topik",
        teks: "Dari portal keluarga, anak bisa memilih mapel dan topik lalu membaca materinya sendiri, kapan saja tanpa perlu nunggu tutor.",
        href: "/rekam-jejak/bimbel-tera",
        // Rekaman layar portal keluarga beneran (akun & siswa dummy, bukan siswa asli), ukuran mobile.
        video: "/videos/belajar-mandiri-preview.mp4",
        poster: "/videos/belajar-mandiri-poster.png",
        mobile: true,
      },
    ],
  },
];
