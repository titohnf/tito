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
    id: "website-baru",
    label: "butuh website baru",
    kalimat: "butuh website baru",
    untuk: semua,
  },
  {
    id: "benahi",
    label: "ingin membenahi website yang sudah ada",
    kalimat: "ingin membenahi website yang sudah ada",
    untuk: semua,
  },
  {
    id: "ide",
    label: "punya ide tapi bingung mulai dari mana",
    kalimat: "punya ide tapi bingung mulai dari mana",
    untuk: semua,
  },
  {
    id: "belajar",
    label: "ingin belajar bikin website sendiri",
    kalimat: "ingin belajar bikin website sendiri",
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
  /** Tombol kedua di pop up, mis. mendaftar kelas. `pesan` = pembuka WhatsApp-nya. */
  tombolDaftar?: { label: string; pesan: string };
  /**
   * Kartu lebar: turun ke barisnya sendiri selebar segmen, isinya ditata
   * mendatar dengan ilustrasi di kanan dan dua tombol di bawah teks.
   * Dipakai satu kartu saja — lebih dari satu dan barisnya jadi pola, bukan sorotan.
   */
  lebar?: boolean;
};

/**
 * Kepala segmen "Layanan" di beranda.
 * Kartunya sendiri diambil dari `layanan` di bawah.
 */
export const kepalaLayanan = {
  judul: "Layanan",
};

export const layanan: Layanan[] = [
  {
    id: "website",
    judul: "Bikin & Benahi Website",
    teks: "Website baru dari nol, atau benahi yang sudah ada biar nggak bikin pengunjung bingung. Saya yang pegang prosesnya.",
    judulDetail: "Bikin & Benahi Website",
    detail: [
      {
        judul: "Yang kamu dapat",
        paragraf:
          "Belum punya website? Saya bikinkan dari nol — buat pajang produk, terima pesanan, atau sekadar biar keliatan lebih dipercaya. Sudah punya tapi kurang maksimal? Saya lihat dulu apa yang bikin pengunjung bingung atau nggak jadi order, lalu kasih rekomendasi yang jelas.",
      },
      {
        judul: "Prosesnya",
        langkah: [
          "Ngobrol dulu soal usaha kamu dan situasi website kamu sekarang",
          "Saya bikin draf baru, atau catat rekomendasi perbaikan",
          "Kita revisi bareng sampai pas, lalu siap dipakai",
        ],
      },
      {
        judul: "Yang perlu disiapkan",
        paragraf:
          "Bikin baru: logo (kalau ada), foto produk, dan info dasar usaha. Membenahi: link website atau media sosial usaha kamu yang sekarang.",
      },
    ],
    pesan: "Halo Tito, saya mau bikin atau benahi website usaha saya. Boleh ngobrol dulu?",
  },
  {
    id: "audit",
    judul: "Buat Sistem Digital untuk Usaha",
    teks: "Pencatatan masih manual atau berantakan di banyak tempat? Saya bantu susun jadi satu sistem yang rapi.",
    judulDetail: "Buat Sistem Digital untuk Usaha",
    detail: [
      {
        judul: "Yang kamu dapat",
        paragraf:
          "Sistem yang pas buat kebutuhan usaha kamu — dari pencatatan manual atau spreadsheet yang berantakan jadi rapi, bisa dipantau, dan gampang dipakai sehari-hari. Bukan sistem generik yang penuh fitur nggak kepakai.",
      },
      {
        judul: "Prosesnya",
        langkah: [
          "Ngobrol dulu soal alur kerja usaha kamu sekarang dan apa yang bikin ribet",
          "Saya rancang sistemnya, mulai dari bagian paling penting dulu",
          "Kita uji coba bareng sampai pas dipakai sehari-hari",
        ],
      },
      {
        judul: "Yang perlu disiapkan",
        paragraf: "Ceritakan alur kerja usaha kamu sekarang, walau masih manual atau pakai spreadsheet.",
      },
    ],
    pesan: "Halo Tito, saya mau bikin sistem digital untuk usaha saya. Boleh ngobrol dulu?",
  },
  {
    id: "ai",
    judul: "Belajar Bikin Website Sendiri",
    teks: "Saya temani sampai kamu bisa bikin dan merawat website sendiri dengan bantuan AI.",
    judulDetail: "Belajar Bikin Website Sendiri",
    detail: [
      {
        judul: "Yang kamu dapat",
        paragraf:
          "Bukan saya yang bikinin, tapi kamu — saya yang nemenin. Kita pakai alat AI yang ada sekarang buat nyusun website kamu dari nol, sampai kamu ngerti cara ngubah dan ngerawatnya sendiri tanpa perlu nunggu siapa-siapa.",
      },
      {
        judul: "Prosesnya",
        langkah: [
          "Kita tentuin dulu website apa yang mau kamu bikin dan buat siapa",
          "Saya kenalin alatnya dan cara ngobrol sama AI biar hasilnya sesuai maksud kamu",
          "Kita kerjain bareng sambil jalan, kamu yang pegang kemudinya",
          "Terakhir, saya kasih cara ngerawat dan ngembanginnya sendiri",
        ],
      },
      {
        judul: "Yang perlu disiapkan",
        paragraf:
          "Laptop dan waktu buat nyoba. Nggak perlu bisa ngoding — yang lebih kepakai justru kejelasan soal apa yang mau kamu sampaikan lewat website itu.",
      },
    ],
    pesan:
      "Halo Tito, saya mau belajar bikin website sendiri dengan bantuan AI. Boleh ngobrol dulu?",
    tombolDaftar: {
      label: "Daftar Kelas",
      pesan: "Halo Tito, saya mau daftar kelas bikin website sendiri dengan AI. Boleh info jadwalnya?",
    },
    lebar: true,
  },
];

/** Pesan WhatsApp langsung dari kartu layanan. */
export function pesanKebutuhan(k: Kebutuhan) {
  return `Halo Tito, saya ${k.kalimat}. Boleh ngobrol dulu?`;
}
