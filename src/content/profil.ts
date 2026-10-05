/**
 * Copy untuk Hero & Tentang Saya. Edit teks di sini tanpa menyentuh komponen.
 */

export const hero = {
  sapaan: "Hi, saya Tito Hanafi 👋",
  judul: "Desainer Produk, 9+ Tahun di Pemerintahan",
  // Kalimat utama (H1). Jabatan (`judul`) dipakai untuk SEO / gambar preview link.
  judulUtama: "Saya mendesain produk digital dan membangunnya dengan AI",
  // Satu kalimat di bawah H1: pengalaman dan ajakan kolaborasi.
  deskripsi: "9+ tahun di pemerintahan, kini terbuka untuk kolaborasi bersama Anda",
  // Tombol di bawah subtitle; membuka WhatsApp dengan pesan pembuka ini.
  tombol: "Mulai projek bersama",
  pesanWA: "Halo Tito, saya tertarik untuk memulai projek bersama.",
  // Dipakai di gambar preview link (OG)
  catatanTombol: "Kini membangun sistem sendiri pakai AI.",
};

/** Segmen pengantar tepat di bawah hero. */
export const pernyataan = {
  judul: "Studi kasus",
  subjudul: "Produk yang saya desain dan bangun dengan AI",
  /** Sub-bagian di bawah bento AI: produk pemerintahan, dikerjakan sebelum era AI. */
  pemerintahan: {
    judul: "Produk yang saya desain di Pemerintahan",
  },

} as const;

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

