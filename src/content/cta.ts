/**
 * Pilihan untuk CTA interaktif (segmen 4).
 * - `label` tampil di form, melanjutkan kalimat "Kamu … dan …".
 * - `kalimat` dipakai untuk menyusun pesan WhatsApp dari sudut pandang pengunjung.
 * - `untuk` di kebutuhan = daftar id peran yang boleh memilih opsi itu.
 */
export type Peran = { id: string; label: string; kalimat: string };
export type Kebutuhan = { id: string; label: string; kalimat: string; untuk: string[] };

export const peran: Peran[] = [
  { id: "usaha-kecil", label: "punya usaha kecil", kalimat: "punya usaha kecil" },
  { id: "individu", label: "mau mulai usaha", kalimat: "mau mulai usaha" },
  { id: "organisasi", label: "mewakili organisasi", kalimat: "mewakili sebuah organisasi" },
  { id: "lainnya", label: "punya keperluan lain", kalimat: "" },
];

const semua = peran.map((p) => p.id);

export const kebutuhan: Kebutuhan[] = [
  {
    id: "website",
    label: "butuh website sederhana",
    kalimat: "butuh website sederhana",
    untuk: semua,
  },
  {
    id: "ide",
    label: "punya ide tapi bingung mulai dari mana",
    kalimat: "punya ide tapi bingung mulai dari mana",
    untuk: ["usaha-kecil", "individu", "lainnya"],
  },
  {
    id: "diskusi",
    label: "butuh teman diskusi soal produk",
    kalimat: "butuh teman diskusi soal produk",
    untuk: semua,
  },
  {
    id: "undangan",
    label: "mau mengundang saya berbagi pengalaman",
    kalimat: "mau mengundang kamu berbagi pengalaman",
    untuk: ["organisasi", "lainnya"],
  },
];

/** Pesan WhatsApp umum (tanpa kebutuhan spesifik). */
export const pesanUmum = "Halo Tito, saya mau ngobrol soal ide saya. Boleh?";

export function susunPesan(p: Peran, k: Kebutuhan) {
  const isi = p.kalimat ? `${p.kalimat} dan ${k.kalimat}` : k.kalimat;
  return `Halo Tito, saya ${isi}. Boleh ngobrol dulu?`;
}

export const catatanCta =
  "Ngobrol pertama gratis. Setelah paham kebutuhan kamu, saya kasih tahu bisa bantu apa dan berapa lama.";

/**
 * Kartu layanan di segmen "Apa yang bisa saya bantu?" di beranda.
 * Terpisah dari `kebutuhan` di atas: yang itu jadi pilihan di CTA interaktif,
 * yang ini kartu dengan copy sendiri.
 */
export type BagianLayanan = { judul: string; paragraf?: string; langkah?: string[] };

export type Layanan = {
  id: string;
  /** Judul pendek di kartu */
  judul: string;
  /** Satu kalimat penjelas di kartu */
  teks: string;
  /** Judul panjang di dalam pop up */
  judulDetail: string;
  /** Isi pop up: beberapa bagian, masing-masing paragraf atau daftar langkah */
  detail: BagianLayanan[];
  /** Pesan pembuka WhatsApp dari layanan ini */
  pesan: string;
  /**
   * Kartu lebar: turun ke barisnya sendiri selebar segmen, isinya ditata
   * mendatar dengan ilustrasi di kanan dan dua tombol di bawah teks.
   * Dipakai satu kartu saja — lebih dari satu dan barisnya jadi pola, bukan sorotan.
   */
  lebar?: boolean;
  /** Tombol kedua di kartu lebar, mis. mendaftar kelas. `pesan` = pembuka WhatsApp-nya. */
  tombolDaftar?: { label: string; pesan: string };
};

/**
 * Kepala segmen "Apa yang bisa saya bantu?" di beranda.
 * Kartunya sendiri diambil dari `layanan` di bawah.
 */
export const kepalaBantuan = {
  judul: "Apa yang bisa saya bantu?",
};

export const layanan: Layanan[] = [
  {
    id: "website",
    judul: "Desain dan Pengembangan Web",
    teks: "Dari ide sampai jadi, saya yang pegang penuh prosesnya.",
    judulDetail: "Buat website untuk produk atau personal branding kamu",
    detail: [
      {
        judul: "Apa yang kamu dapat",
        paragraf:
          "Website sederhana yang bisa langsung dipakai — buat pajang produk, terima pesanan, atau sekadar biar keliatan lebih dipercaya orang yang baru kenal usaha kamu.",
      },
      {
        judul: "Bagaimana prosesnya",
        langkah: [
          "Ngobrol dulu soal usaha kamu dan apa yang kamu butuhin",
          "Saya bikin draf awal buat dilihat dan direvisi bareng",
          "Setelah oke, saya siapkan sampai bisa langsung dipakai",
        ],
      },
      {
        judul: "Yang perlu kamu siapin",
        paragraf:
          "Logo (kalau ada), foto produk, dan info dasar usaha kamu. Belum punya semua itu? Nggak apa-apa, kita bisa mulai dari yang ada dulu.",
      },
    ],
    pesan:
      "Halo Tito, saya mau buat website untuk produk atau personal branding. Boleh ngobrol dulu?",
  },
  {
    id: "audit",
    judul: "Audit dan Optimalisasi Web",
    teks: "Saya bantu cari titik yang bikin orang bingung atau kurang tertarik, lalu kasih masukan konkret.",
    judulDetail: "Bantu lihat ulang website atau usaha yang sudah jalan",
    detail: [
      {
        judul: "Apa yang kamu dapat",
        paragraf:
          "Bukan langsung redesign total — saya lihat dulu apa yang bikin orang bingung atau nggak jadi order, terus kasih rekomendasi konkret. Mau lanjut dieksekusi bareng saya atau nggak, itu terserah kamu.",
      },
      {
        judul: "Bagaimana prosesnya",
        langkah: [
          "Kamu kirim link website/media sosial usaha kamu",
          "Saya lihat dan catat titik-titik yang perlu diperbaiki",
          "Kita ngobrol bareng soal temuan itu dan langkah selanjutnya",
        ],
      },
    ],
    pesan:
      "Halo Tito, saya mau minta bantuan lihat ulang website atau usaha yang sudah jalan. Boleh ngobrol dulu?",
  },
  {
    id: "ngobrol",
    judul: "Diskusi Ide atau Projek",
    teks: "Belum harus jelas arahnya — mulai dari ngobrol dulu juga nggak apa-apa.",
    judulDetail: "Ngobrol dulu soal ide atau usaha yang sedang kamu pikirkan",
    detail: [
      {
        judul: "Ini buat siapa",
        paragraf:
          'Kamu yang masih di tahap "kayaknya ini ide bagus, tapi belum tau harus mulai dari mana" — belum butuh website, belum butuh apa-apa yang konkret, cuma butuh teman diskusi.',
      },
      {
        judul: "Yang terjadi kalau ngobrol",
        paragraf:
          "Nggak ada agenda tertentu. Kita ngobrol soal idenya, saya kasih pandangan dari sudut desain/produk, dan dari situ baru kelihatan apakah perlu lanjut ke langkah konkret atau cukup sampai situ dulu.",
      },
    ],
    pesan: "Halo Tito, saya mau ngobrol soal ide atau usaha yang sedang saya pikirkan. Boleh?",
  },
  {
    id: "ai",
    judul: "Belajar Bikin Web Sendiri",
    teks: "Saya temani sampai kamu bisa bikin dan rawat website sendiri pakai bantuan AI.",
    judulDetail: "Belajar bikin website sendiri dengan bantuan AI",
    detail: [
      {
        judul: "Apa yang kamu dapat",
        paragraf:
          "Bukan saya yang bikinin, tapi kamu — saya yang nemenin. Kita pakai alat AI yang ada sekarang buat nyusun website kamu dari nol, sampai kamu ngerti cara ngubah dan ngerawatnya sendiri tanpa perlu nunggu siapa-siapa.",
      },
      {
        judul: "Bagaimana prosesnya",
        langkah: [
          "Kita tentuin dulu website apa yang mau kamu bikin dan buat siapa",
          "Saya kenalin alatnya dan cara ngobrol sama AI biar hasilnya sesuai maksud kamu",
          "Kita kerjain bareng sambil jalan, kamu yang pegang kemudinya",
          "Terakhir, saya kasih cara ngerawat dan ngembanginnya sendiri",
        ],
      },
      {
        judul: "Yang perlu kamu siapin",
        paragraf:
          "Laptop dan waktu buat nyoba. Nggak perlu bisa ngoding — yang lebih kepakai justru kejelasan soal apa yang mau kamu sampaikan lewat website itu.",
      },
    ],
    pesan:
      "Halo Tito, saya mau belajar bikin website sendiri dengan bantuan AI. Boleh ngobrol dulu?",
    lebar: true,
    tombolDaftar: {
      label: "Daftar Kelas",
      pesan: "Halo Tito, saya mau daftar kelas bikin website sendiri dengan AI. Boleh info jadwalnya?",
    },
  },
];

/** Pesan WhatsApp langsung dari kartu layanan. */
export function pesanKebutuhan(k: Kebutuhan) {
  return `Halo Tito, saya ${k.kalimat}. Boleh ngobrol dulu?`;
}
