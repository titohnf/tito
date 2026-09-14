/**
 * Copy yang sama untuk semua persona. Isi khusus tiap persona ada di ./persona.ts
 */
export const hero = {
  sapaan: "Hi, saya Tito",
  labelPersona: "Lihat Tito sebagai",
  tombolUtama: "Lihat apa yang bisa saya bantu",
  tombolKedua: "Diskusikan ide kamu",
  catatanTombol: "Ngobrol dulu gratis, nggak ada komitmen.",
};

export type BabTentang = {
  id: string;
  label: string; // label kecil, mis. "Oleh Rakyat"
  judul: string; // headline besar
  paragraf: string[];
  funFact?: string;
  tautan?: { label: string; href: "bantuan" | "laporanKerja" };
};

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
