/**
 * Copy untuk Hero & Tentang Saya. Edit teks di sini tanpa menyentuh komponen.
 */
export const hero = {
  sapaan: "Halo, saya Tito",
  // "Desainer [kata] Rakyat" — kata di tengah berganti otomatis
  julukan: {
    awal: "Desainer",
    kata: ["Perwakilan", "Pelayan", "Pendamping"],
    akhir: "Rakyat",
  },
  intervalGantiMs: 3000,
  paragraf:
    "Dari mendesain layanan publik hingga mendirikan yayasan, sekarang terbuka untuk mendiskusikan produk yang kamu kembangkan.",
  tombolUtama: "Lihat apa yang bisa saya bantu",
  // Tautan teks kecil di bawah tombol utama, langsung ke WhatsApp
  tautanWhatsApp: "chat langsung di WhatsApp",
  // Dipakai di gambar preview link (OG)
  catatanTombol: "Ngobrol pertama gratis, tanpa komitmen.",
};

/**
 * Data pencapaian yang berjalan di bawah hero. Urutan di sini = urutan tampil.
 * Diambil dari cerita di segmen Tentang — pastikan tetap sinkron kalau ceritanya berubah.
 */
export const pencapaian: { kelompok: string; angka: string; keterangan: string }[] = [
  { kelompok: "Mengabdi", angka: "9+", keterangan: "tahun jadi tenaga ahli" },
  { kelompok: "Membina", angka: "50+", keterangan: "anak binaan yayasan" },
  { kelompok: "Menginisiasi", angka: "5", keterangan: "program berdampak" },
  { kelompok: "Mendampingi", angka: "3", keterangan: "sesi konsultasi" },
];

export type BabTentang = {
  id: string;
  label: string; // label kecil, mis. "Sebagai Desainer Perwakilan Rakyat"
  judul: string; // headline besar
  paragraf: string[];
  funFact?: string;
  tautan?: { label: string; href: "bantuan" | "rekamJejak" | "tera" };
  // Kartu di kolom kanan (gambar + teks + tombol). Kosong = 3 placeholder.
  // gambar: path di /public, mis. "/images/kominfo.jpg"
  sorotan?: { judul: string; teks: string; tombol: string; href: string; gambar?: string }[];
};

export const tentang: BabTentang[] = [
  {
    id: "perwakilan",
    label: "Sebagai Desainer Perwakilan Rakyat",
    judul: "9 tahun ikut mendesain sistem yang dipakai jutaan orang",
    paragraf: [
      "Sejak awal karier, saya jadi tenaga ahli di pemerintahan: Kominfo (sekarang Komdigi), Pemprov DKI Jakarta (JSC), Peruri (INA Digital), dan terakhir Kemendikdasmen (INA Digital Edu).",
    ],
    funFact:
      'Saya mendesain "super app" untuk 3 dari 4 instansi itu, dan 2 di antaranya meraih penghargaan global.',
    tautan: { label: "Lihat rekam jejak saya", href: "rekamJejak" },
  },
  {
    id: "pelayan",
    label: "Sebagai Desainer Pelayan Rakyat",
    judul: "Mendirikan yayasan pendidikan sendiri",
    paragraf: [
      "Masih dengan semangat yang sama, berkontribusi untuk Indonesia yang lebih baik, saya mendirikan Yayasan Tera Inspirasi Bangsa untuk menjawab masalah pendidikan di sekitar saya.",
    ],
    tautan: { label: "Lihat cerita membangun Tera", href: "tera" },
  },
  {
    id: "pendamping",
    label: "Sebagai Desainer Pendamping Rakyat",
    judul: "Jadi teman diskusi untuk ide dan usaha kamu",
    paragraf: [
      "Pengalaman merancang sistem besar dan menjalankan yayasan sendiri kini saya bagikan ke pemilik usaha, calon founder, dan organisasi yang butuh sudut pandang lain.",
    ],
    tautan: { label: "Lihat apa yang bisa saya bantu", href: "bantuan" },
  },
];

/** Isi pembuka halaman /tera ("Membangun Tera"). */
export const membangunTera = {
  label: "Membangun Tera",
  judul: "Dari desainer, jadi ikut coding sistemnya sendiri",
  paragraf:
    "Menjalankan Tera membuat saya sadar desain saja tidak cukup. Saya mulai membangun sistem sendiri dengan bantuan AI, dari sistem operasional bimbel sampai website Tera. Sebagian sudah jalan, sebagian masih coba-coba.",
};
