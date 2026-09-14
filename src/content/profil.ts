/**
 * Copy untuk Hero & Tentang Saya. Edit teks di sini tanpa menyentuh komponen.
 */
export const hero = {
  sapaan: "Hi, saya Tito",
  // Julukan + baris fakta pertama berganti saat di-tap. Varian pertama = default
  // (juga yang dipakai untuk judul share/og:title di src/config/site.ts).
  varian: [
    {
      julukan: "Desainer Perwakilan Rakyat",
      fakta: "9+ tahun dipercaya mendesain layanan digital di pemerintahan.",
    },
    {
      julukan: "Desainer Pelayan Rakyat",
      fakta: "Mendirikan yayasan sendiri untuk pendidikan.",
    },
    {
      julukan: "Desainer Pendamping Rakyat",
      fakta: "Sekarang, membuka diri mendampingi usaha kecil dan ide-ide baru.",
    },
  ],
  // Baris fakta kedua & ketiga (tidak ikut berganti)
  faktaStatis: [
    "Lalu mendirikan yayasan sendiri untuk pendidikan.",
    "Sekarang, terbuka untuk mendiskusikan produk, atau ide yang ingin kamu kembangkan.",
  ],
  petunjukGanti: "Ketuk untuk ganti",
  tombolUtama: "Lihat apa yang bisa saya bantu",
  tombolKedua: "Diskusikan ide kamu",
  catatanTombol: "Ngobrol dulu gratis, nggak ada komitmen.",
  // Baris kecil di bawah hero
  pernahDipercaya: {
    label: "Pernah dipercaya oleh",
    daftar: ["Kominfo", "Pemprov DKI Jakarta", "Peruri", "Kemendikdasmen"],
  },
};

export type BabTentang = {
  id: string;
  label: string; // label kecil, mis. "Oleh Rakyat"
  judul: string; // headline besar
  paragraf: string[];
  funFact?: string;
  tautan?: { label: string; href: "bantuan" | "laporanKerja" };
};

export const tentang: BabTentang[] = [
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
  {
    id: "untuk-rakyat",
    label: "Untuk Rakyat",
    judul: "Mendirikan yayasan pendidikan sendiri",
    paragraf: [
      "Melihat dan mencoba memahami permasalahan di lingkungan sekitar, masih dalam semangat berkontribusi untuk Indonesia yang lebih baik, saya mendirikan yayasan Tera Inspirasi Bangsa.",
      "Dan saat ini saya juga membuka diri untuk berbagi pengalaman dan kemampuan saya dalam mengembangkan produk digital yang mungkin kamu butuhkan.",
    ],
    tautan: { label: "Lihat apa yang bisa saya bantu", href: "bantuan" },
  },
];

/** Teaser "Membangun Tera" — tampil setelah blok Untuk Rakyat. Cerita lengkap di /tera. */
export const membangunTera = {
  label: "Membangun Tera",
  judul: "Dari desainer, jadi ikut coding sistemnya sendiri",
  paragraf:
    "Menjalankan Tera bikin saya sadar, desain aja nggak cukup. Saya mulai belajar membangun sistem sendiri pakai AI — dari sistem internal buat operasional bimbel, sampai website Tera sendiri. Sebagian jalan, sebagian masih coba-coba.",
  tombol: "Lihat prosesnya",
  // TODO: isi dengan screenshot asli (taruh di /public/images/), mis. "/images/tera-sistem.png".
  // Selama kosong, tampil ilustrasi kerangka layar.
  gambar: "",
};
