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
    id: "sistem",
    label: "ingin membuat sistem untuk usaha",
    kalimat: "ingin membuat sistem digital untuk usaha saya",
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
    label: "mau mengundang Tito berbagi pengalaman",
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

/**
 * Kartu layanan di segmen "Apa yang bisa saya bantu?" di beranda.
 * Terpisah dari `kebutuhan` di atas: yang itu jadi pilihan di CTA interaktif,
 * yang ini kartu dengan copy sendiri.
 */
export type BagianLayanan = {
  judul: string;
  paragraf?: string;
  langkah?: string[];
  /** Teks kecil di bawah isi bagian, mis. catatan syarat atau keterbatasan. */
  catatan?: string;
};

export type Layanan = {
  id: string;
  /** Judul pendek di kartu */
  judul: string;
  /** Satu kalimat penjelas di kartu */
  teks: string;
  /** Patokan harga singkat yang tampil di kartu, mis. "Mulai Rp 2,5 juta". */
  harga?: string;
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
    harga: "Mulai Rp 2,5 juta",
    teks: "Website baru dari nol, atau benahi yang sudah ada supaya pengunjung paham dan mau order. Saya yang pegang prosesnya.",
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
      {
        judul: "Biaya",
        paragraf:
          "Website sederhana (beberapa halaman, tombol WhatsApp, nyaman dibuka di HP) mulai Rp 2,5 juta. Toko online atau fitur tambahan menyesuaikan. Domain dan hosting dibayar terpisah, sekitar Rp 500 ribu–1,5 juta per tahun. Angka pastinya saya kabari setelah kita ngobrol, gratis dan tanpa kewajiban.",
      },
      {
        judul: "Setelah jadi",
        paragraf:
          "Kalau ada yang error, saya perbaiki gratis selama 30 hari. Setelah itu perawatan bulanan bersifat opsional, mulai Rp 300 ribu per bulan: cadangan data, pembaruan, ubah konten, dan perbaikan kecil. Mau mengurus sendiri? Saya ajari lewat kelas.",
      },
    ],
    pesan: "Halo Tito, saya mau bikin atau benahi website usaha saya. Boleh ngobrol dulu?",
  },
  {
    id: "audit",
    judul: "Buat Sistem Digital untuk Usaha",
    harga: "Mulai Rp 5 juta",
    teks: "Masih catat manual, atau data tersebar di banyak tempat? Saya satukan jadi satu sistem yang rapi dan gampang dipakai.",
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
      {
        judul: "Biaya",
        paragraf:
          "Sistem sederhana (pencatatan, jadwal, atau tagihan untuk satu jenis pengguna) mulai Rp 5 juta. Sistem dengan beberapa peran pengguna dan laporan biasanya Rp 8–15 juta, tergantung alur kerja usahamu. Dikerjakan bertahap dari bagian yang paling penting, jadi kamu bisa berhenti di tahap yang sudah cukup. Angka pastinya saya kabari setelah kita ngobrol, gratis dan tanpa kewajiban.",
      },
      {
        judul: "Setelah jadi",
        paragraf:
          "Kalau ada yang error, saya perbaiki gratis selama 30 hari, dan saya dampingi kamu dan timmu sampai terbiasa memakainya. Setelah itu perawatan bulanan bersifat opsional, mulai Rp 300 ribu per bulan: cadangan data, pembaruan, dan perbaikan kecil.",
      },
    ],
    pesan: "Halo Tito, saya mau bikin sistem digital untuk usaha saya. Boleh ngobrol dulu?",
  },
  {
    id: "ai",
    judul: "Belajar Bikin Website Sendiri",
    harga: "Rp150.000/pertemuan",
    teks: "Dalam 4 pertemuan, kamu punya website sendiri dan tahu cara merawatnya, dibantu AI. Kelas kecil, maksimal 5 orang.",
    judulDetail: "Belajar Bikin Website Sendiri",
    detail: [
      {
        judul: "Tentang kelas",
        paragraf:
          "Kelas kecil (maksimal 5 orang per batch, minimal 3 orang agar kelas berjalan), 4 kali pertemuan, 1–1,5 jam per pertemuan. Di akhir kelas, kamu punya website sendiri yang kamu bangun pakai AI — bukan cuma teori.",
      },
      {
        judul: "Harga",
        paragraf: "Rp150.000 per pertemuan per orang. Untuk 4 pertemuan: Rp600.000/orang.",
        catatan: "Kelas berjalan kalau pendaftar minimal 3 orang per batch.",
      },
      {
        judul: "Materi per pertemuan",
        langkah: [
          "Kenalan Tools & Mulai Halaman Pertama — kenalan sama alat AI coding, tentukan ide/usaha yang mau dijadikan website, langsung praktik bikin halaman Beranda.",
          "Isi Konten Asli — tambah halaman Produk/Tentang/Kontak, belajar kasih instruksi yang jelas ke AI, mulai masukin teks dan foto usaha masing-masing.",
          "Rapiin Tampilan — dasar bikin tampilan enak dilihat dan bagus di HP, tambah fitur sederhana (tombol WhatsApp, form kontak).",
          "Online & Belajar Rawat Sendiri — cara publish website, dasar merawat/update sendiri, evaluasi hasil akhir bareng.",
        ],
      },
    ],
    pesan:
      "Halo Tito, saya mau belajar bikin website sendiri dengan bantuan AI. Boleh ngobrol dulu?",
    tombolDaftar: {
      label: "Daftar Kelas",
      pesan:
        "Halo Tito, saya mau daftar Kelas Belajar Bikin Website Sendiri. Boleh info jadwal batch berikutnya?",
    },
    lebar: true,
  },
];

/** Pesan WhatsApp langsung dari kartu layanan. */
export function pesanKebutuhan(k: Kebutuhan) {
  return `Halo Tito, saya ${k.kalimat}. Boleh ngobrol dulu?`;
}
