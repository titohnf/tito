/**
 * Testimoni dari rekan kerja, mitra Tera, atau orang tua murid.
 * Tampil di beranda sebagai papan sticky note; segmennya otomatis tersembunyi
 * selama array ini kosong.
 *
 * Kutipan sengaja dibiarkan apa adanya (termasuk singkatan dan typo khas chat) —
 * itu yang bikin terasa asli, jangan dirapikan jadi bahasa formal.
 */
export type Testimoni = {
  /** Id tetap, dipakai sebagai kunci penghitung love. Jangan diubah setelah tayang —
   *  id baru berarti angkanya mulai dari nol lagi. */
  id?: string;
  kutipan: string;
  nama: string;
  /** Opsional: hanya diisi kalau jabatannya perlu tampil di nota. */
  peran?: string;
};

/** Kepala segmen: judul besar tanpa label mono di atasnya. */
export const kepala = {
  judul: "Kesan rekan-rekan yang pernah kerja bareng.",
};

/** Nota kosong di ujung trek: pengunjung menulis, lalu notanya menempel di papan. */
export const notaKosong = {
  ajakan: "Pernah kerja bareng saya? Tulis di sini.",
  placeholderKutipan: "Tulis kesanmu…",
  placeholderNama: "Nama kamu",
  tombol: "Tempel dan kirim",
  /** Label pengganti jabatan di nota yang ditempel pengunjung. */
  penanda: "Dari kamu",
  /** Tautan kecil di nota sendiri, supaya kesannya benar-benar sampai ke saya. */
  tautanKirim: "Kirim ke Tito",
};

export const testimoni: Testimoni[] = [
  {
    id: "can-do",
    kutipan:
      "Anaknya can-do attitude banget. Kadang gue yang taichi kerjaan eh anaknya ternyata semangat ngerjain hahaha.",
    nama: "Tasha Dara",
    peran: "Design Manager, INA Digital Edu",
  },
  {
    id: "diandelin",
    kutipan:
      "Bisa diandelin banget lah buat manage kerjaan sendiri, bisa bangun relationship sama stakeholder dan proaktif juga kalau ada blocker yang perlu diclarify",
    nama: "Tasha Dara",
    peran: "Design Manager, INA Digital Edu",
  },
  {
    id: "ngechallenge",
    kutipan:
      "berani ngechallenge kalo diskusi design dan menyuarakan pendapatnya (ke product jg)",
    nama: "Tasha Stamboel",
    peran: "Researcher, INA Digital Edu",
  },
  {
    id: "kilat",
    kutipan:
      "kerjanya kilatttt, alias tiba2 udah beres aja (kalo ditanya butuh berapa lama, jawabnya ‘sehari bisa nih’)",
    nama: "Tasha Stamboel",
    peran: "Researcher, INA Digital Edu",
  },
  {
    id: "ninja",
    kutipan: "Bergerak seperti ninja alias diam2 jago ngulik tools!!",
    nama: "Nur Kumalaningtyas",
    peran: "Copy Designer, INA Digital Edu",
  },
];
