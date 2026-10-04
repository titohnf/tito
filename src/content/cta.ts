/**
 * Pilihan untuk CTA interaktif (segmen 4).
 * - `label` tampil di form, melanjutkan kalimat "Kamu … dan …".
 * - `kalimat` dipakai untuk menyusun pesan WhatsApp dari sudut pandang pengunjung.
 * - `untuk` di kebutuhan = daftar id peran yang boleh memilih opsi itu.
 */
export type Peran = { id: string; label: string; kalimat: string };
export type Kebutuhan = { id: string; label: string; kalimat: string; untuk: string[] };

export const peran: Peran[] = [
  { id: "perusahaan", label: "mewakili perusahaan/organisasi", kalimat: "mewakili sebuah perusahaan/organisasi" },
  { id: "desainer", label: "sesama desainer atau builder", kalimat: "sesama desainer/builder" },
  { id: "media", label: "media atau penyelenggara acara", kalimat: "dari media/penyelenggara acara" },
  { id: "lainnya", label: "lainnya", kalimat: "" },
];

export const kebutuhan: Kebutuhan[] = [
  {
    id: "posisi",
    label: "mengevaluasi untuk posisi tertentu",
    kalimat: "sedang mengevaluasi kamu untuk posisi tertentu",
    untuk: ["perusahaan", "lainnya"],
  },
  {
    id: "proyek",
    label: "mendiskusikan sebuah proyek",
    kalimat: "ingin mendiskusikan sebuah proyek",
    untuk: peran.map((p) => p.id),
  },
  {
    id: "ai",
    label: "ngobrol soal membangun pakai AI",
    kalimat: "ingin ngobrol soal membangun pakai AI",
    untuk: peran.map((p) => p.id),
  },
  {
    id: "undangan",
    label: "mengundang untuk sharing atau ngajar",
    kalimat: "ingin mengundang kamu untuk sharing atau ngajar",
    untuk: peran.map((p) => p.id),
  },
];

export function susunPesan(p: Peran, k: Kebutuhan) {
  const isi = p.kalimat ? `${p.kalimat} dan ${k.kalimat}` : k.kalimat;
  return `Halo Tito, saya ${isi}. Boleh ngobrol dulu?`;
}
