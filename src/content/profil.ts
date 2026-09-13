/**
 * Copy untuk Hero & Tentang Saya. Edit teks di sini tanpa menyentuh komponen.
 */
export const hero = {
  sapaan: "Hi, saya Tito",
  julukan: "Desainer Perwakilan Rakyat",
  paragraf: [
    "9+ tahun dipercaya mendesain layanan digital di pemerintahan.",
    "Lalu mendirikan yayasan sendiri untuk pendidikan.",
    "Sekarang, terbuka untuk mendiskusikan produk, atau ide yang ingin kamu kembangkan.",
  ],
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
  judul: string;
  paragraf: string[];
  funFact?: string;
  tautan?: { label: string; href: "bantuan" | "laporanKerja" };
};

export const tentang: BabTentang[] = [
  {
    id: "dari-rakyat",
    judul: "Dari Rakyat",
    paragraf: [
      'Membaca buku "Indonesia di tanganmu" —oleh-oleh yang saya terima setelah mengikuti pelatihan penerima beasiswa— sepertinya menjadi pemicu jiwa nasionalisme dalam diri saya muncul. Ketika kuliah saya dan teman-teman mendirikan "Garuda Creative" (digital agency untuk UMKM) dan "Indonesia Positif" (portal berita baik tentang Indonesia). Kurang nasionalisme apa coba? Haha.',
    ],
    funFact:
      "Garuda Creative menjadi salah satu usaha mahasiswa yang memenangkan kompetisi dan mendapatkan permodalan dari kampus.",
  },
  {
    id: "oleh-rakyat",
    judul: "Oleh Rakyat",
    paragraf: [
      "Pun ketika masuk ke dunia kerja, sepertinya takdir ingin saya dekat dengan pemerintah. Hampir 10 tahun konsisten menjadi tenaga ahli, mulai dari Kominfo (sekarang Komdigi), Pemprov DKI Jakarta (JSC), Peruri (INA Digital), hingga terakhir di Kemendikdasmen (INA Digital Edu).",
    ],
    funFact:
      'saya mendesain "super app" untuk 3 dari 4 instansi tersebut, 2 di antaranya mendapatkan penghargaan tingkat global.',
    tautan: { label: "Lihat laporan kerja saya", href: "laporanKerja" },
  },
  {
    id: "untuk-rakyat",
    judul: "Untuk Rakyat",
    paragraf: [
      "Melihat dan mencoba memahami permasalahan di lingkungan sekitar, masih dalam semangat berkontribusi untuk Indonesia yang lebih baik, saya mendirikan yayasan Tera Inspirasi Bangsa.",
      "Dan saat ini saya juga membuka diri untuk berbagi pengalaman dan kemampuan saya dalam mengembangkan produk digital yang mungkin kamu butuhkan.",
    ],
    tautan: { label: "Lihat apa yang bisa saya bantu", href: "bantuan" },
  },
];
