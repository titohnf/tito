/**
 * Pilihan untuk CTA interaktif (segmen 4).
 * - `kalimat` dipakai untuk menyusun pesan WhatsApp yang natural.
 * - `untuk` di kebutuhan = daftar id peran yang boleh memilih opsi itu.
 */
export type Peran = { id: string; label: string; kalimat: string };
export type Kebutuhan = { id: string; label: string; kalimat: string; untuk: string[] };

export const peran: Peran[] = [
  { id: "usaha-kecil", label: "Pemilik usaha kecil", kalimat: "saya punya usaha kecil" },
  { id: "individu", label: "Individu yang mau mulai usaha", kalimat: "saya lagi mau mulai usaha" },
  { id: "organisasi", label: "Organisasi", kalimat: "saya dari sebuah organisasi" },
  { id: "lainnya", label: "Lainnya", kalimat: "" },
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
    label: "ingin mengundang saya berbagi pengalaman",
    kalimat: "ingin mengundang kamu berbagi pengalaman",
    untuk: ["organisasi", "lainnya"],
  },
];

export function susunPesan(p: Peran, k: Kebutuhan) {
  const pembuka = p.kalimat ? `${p.kalimat}, dan saat ini saya` : "saat ini saya";
  return `Halo Tito, ${pembuka} ${k.kalimat}. Boleh ngobrol dulu?`;
}

export const catatanCta =
  "Chat dulu, gratis, buat ngerti kebutuhan kamu. Baru saya kasih tau bisa bantu apa dan kira-kira berapa lama.";
