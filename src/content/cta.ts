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

/** Alur singkat di halaman /bantuan. */
export const alurKerja = [
  "Ceritakan kebutuhan kamu lewat WhatsApp",
  "Kita ngobrol dulu, gratis dan tanpa komitmen",
  "Saya kasih tahu bisa bantu apa dan perkiraan waktunya",
];

/** Pesan WhatsApp langsung dari kartu layanan di /bantuan. */
export function pesanKebutuhan(k: Kebutuhan) {
  return `Halo Tito, saya ${k.kalimat}. Boleh ngobrol dulu?`;
}
