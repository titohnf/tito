/**
 * Copy untuk Hero & Tentang Saya. Edit teks di sini tanpa menyentuh komponen.
 */

export const hero = {
  sapaan: "Hi, saya Tito Hanafi 👋",
  judul: "Desainer Produk, 9+ Tahun di Pemerintahan",
  // Kalimat utama (H1). Jabatan (`judul`) dipakai untuk SEO / gambar preview link.
  judulUtama:
    "Desainer yang menggunakan AI untuk mewujudkan ide dan mimpinya",
  // Dipakai di gambar preview link (OG)
  catatanTombol: "Kini membangun sistem sendiri pakai AI.",
};

/** Segmen pengantar tepat di bawah hero. */
export const pernyataan = {
  judul: "Studi kasus",
} as const;

export type StatusIde = "menunggu" | "proses" | "selesai";

export type Ide = {
  teks: string;
  status: StatusIde;
  /** Tautan ke hasilnya; hanya dipakai untuk ide yang sudah selesai. */
  tautan?: string;
};

/** Daftar ide di kolom kanan hero. Dikelompokkan per status; urutan di sini = urutan
 * tampil di dalam kelompoknya. Data masih dummy. */
export const daftarIde: { judul: string; diperbarui: string; butir: Ide[] } = {
  judul: "Daftar ide",
  /** Tanggal update terakhir papan, tampil di pojok kanan bawah. */
  diperbarui: "4 Oktober 2026",
  butir: [
    { teks: "Membuat website pribadi", status: "selesai", tautan: "/" },
    { teks: "Membuat website usaha", status: "selesai", tautan: "/rekam-jejak" },
    { teks: "Membuat website komunitas", status: "proses" },
    { teks: "Membuat aplikasi fondasi matematika", status: "proses" },
    { teks: "Membuat dashboard bimbel", status: "proses" },
    { teks: "Membuat aplikasi penguasaan materi matematika", status: "menunggu" },
    { teks: "Membuat tools pembuatan soal", status: "menunggu" },
    { teks: "Membuat sistem pencatatan keuangan", status: "menunggu" },
  ],
};

export const tentangSingkat = {
  judul: "Tentang saya",
  paragraf:
    "9+ tahun dipercaya merancang web dan aplikasi pemerintah, saat ini aktif mengembangkan sistem untuk usaha dan komunitas.",
  funFakta: [
    "Senang membangun startup sejak kuliah, satu di antaranya mendapatkan pendanaan dari kampus",
    "Memimpin tim desain di 2 instansi dengan 5 sampai 7 anggota",
    "Memimpin tim desain membuat aplikasi \"super app\" yang memenangkan penghargaan tingkat global",
    "Mendirikan yayasan, mengajar mapel Matematika dan Kelas Siap Kerja",
    "Semua pengalaman kerja full time di pemerintahan, mulai dari pemprov, kementerian, dan BUMN",
  ],
};

/** Fun fact bab Pelayan; dipakai ulang di halaman detail /rekam-jejak/tera. */
export const faktaPelayan = [
  "Mendirikan yayasan sebelum umur 30",
  "Aktif di beberapa organisasi non profit",
  "Menginisiasi kelas siap kerja anak",
  "Wakil gubernur BEM Fakultas",
  "Juri karya tulis inovasi & leadership",
];

/** Pembuka cerita Tera; jadi bagian "Konteks" di /rekam-jejak/tera. */
export const membangunTera = {
  label: "Membangun Tera",
  judul: "Dari desainer, jadi ikut coding sistemnya sendiri",
  paragraf:
    "Menjalankan Tera membuat saya sadar desain saja tidak cukup. Saya mulai membangun sistem sendiri dengan bantuan AI, dari sistem operasional bimbel sampai website Tera. Sebagian sudah jalan, sebagian masih coba-coba.",
};

