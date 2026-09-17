/**
 * Copy untuk Hero & Tentang Saya. Edit teks di sini tanpa menyentuh komponen.
 */
import type { Segmen } from "./segmen";

export const hero = {
  sapaan: "Halo, saya Tito",
  // "Desainer [kata] Rakyat" — kata di tengah berganti otomatis
  julukan: {
    awal: "Desainer",
    kata: ["Perwakilan", "Pelayan", "Pendamping"],
    akhir: "Rakyat",
    // Kata terkunci setelah foto hero "dicoblos"
    kataPilihan: "Pilihan",
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
  id: Segmen; // sekaligus anchor di beranda & nilai ?peran= di /rekam-jejak dan /pembelajaran
  label: string; // label kecil, mis. "Sebagai Desainer Perwakilan Rakyat"
  judul: string; // headline besar
  paragraf?: string[];
  // Daftar fun fact bab ini. Jadi kartu penutup deretan sorotan (menggantikan
  // kartu "Lihat seluruh rekam jejak") dan dipakai lagi di halaman detail sorotan.
  funFakta?: string[];
  tautan?: { label: string; href: "bantuan" | "rekamJejak" | "tera" };
  /** Ganti deretan sorotan bab ini dengan kartu kebutuhan dari halaman /bantuan. */
  kartuBantuan?: boolean;
  /** Sembunyikan kartu penutup "Lihat seluruh rekam jejak" di deretan sorotan bab ini. */
  tanpaTautanUmum?: boolean;
  // Kartu di kolom kanan (gambar + label + judul). Kosong = 3 placeholder.
  // gambar: path di /public, mis. "/images/kominfo.jpg"
  sorotan?: {
    label?: string;
    judul: string;
    teks?: string;
    href: string;
    gambar?: string;
    /** 2 = kartu dilebarkan jadi dua kolom di trek sorotan (mulai layar tablet). */
    lebar?: 2;
  }[];
};

/** Fun fact bab Pelayan; dipakai ulang di halaman detail /rekam-jejak/tera. */
export const faktaPelayan = [
  "Mendirikan yayasan sebelum umur 30",
  "Aktif di beberapa organisasi non profit",
  "Menginisiasi kelas siap kerja anak",
  "Wakil gubernur BEM Fakultas",
  "Juri karya tulis inovasi & leadership",
];

export const tentang: BabTentang[] = [
  {
    id: "perwakilan",
    label: "Sebagai Desainer Perwakilan Rakyat",
    judul: "Menerjemahkan visi besar ke dalam rancangan sederhana untuk semua warga.",
    funFakta: [
      "Menginisiasi UI/UX mini course di JSC",
      "Memimpin 7 desainer produk di JSC",
      'Fitur vaksin viral karena "Eren Yeager"',
      "2 aplikasi meraih penghargaan global",
      'Mendesain 3 "super app" di 4 instansi',
    ],
  },
  {
    id: "pelayan",
    label: "Sebagai Desainer Pelayan Rakyat",
    judul: "Mengambil peran walaupun jauh dari kesempurnaan.",
    funFakta: faktaPelayan,
    sorotan: [
      {
        label: "Mendirikan Tera Foundation",
        judul: "Bebaskan anak marjinal untuk bermimpi",
        href: "/rekam-jejak/tera",
        lebar: 2,
      },
    ],
  },
  {
    id: "pendamping",
    label: "Sebagai Desainer Pendamping Rakyat",
    judul: "Memberi nilai tambah untuk ide dan usaha yang kamu kembangkan.",
    kartuBantuan: true,
    tanpaTautanUmum: true,
  },
];

/** Pembuka cerita Tera; jadi bagian "Konteks" di /rekam-jejak/tera. */
export const membangunTera = {
  label: "Membangun Tera",
  judul: "Dari desainer, jadi ikut coding sistemnya sendiri",
  paragraf:
    "Menjalankan Tera membuat saya sadar desain saja tidak cukup. Saya mulai membangun sistem sendiri dengan bantuan AI, dari sistem operasional bimbel sampai website Tera. Sebagian sudah jalan, sebagian masih coba-coba.",
};
