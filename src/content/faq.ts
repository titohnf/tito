/**
 * Pertanyaan yang sering muncul. Hanya yang `jawaban`-nya terisi yang tampil
 * di beranda — sisanya tetap tersimpan di sini sebagai draf.
 */
export type Faq = { pertanyaan: string; jawaban: string | null };

export const faq: Faq[] = [
  {
    pertanyaan: "Apa yang perlu saya siapkan?",
    jawaban: "Logo (kalau ada), foto produk, dan info dasar usaha. Belum punya? Kita mulai dari yang ada.",
  },
  {
    pertanyaan: "Saya belum tahu butuh apa.",
    jawaban: "Ngobrol saja dulu, gratis.",
  },
  {
    pertanyaan: "Berapa biayanya?",
    jawaban:
      "Beda-beda, tergantung kebutuhan usaha kamu. Nanti kita bahas pas ngobrol dulu, biar dapat harga yang wajar buat kamu.",
  },
  {
    pertanyaan: "Butuh berapa lama?",
    jawaban: "Tergantung besar kecilnya website, tapi biasanya beres dalam hitungan minggu, bukan bulan.",
  },
  // TODO: isi jawabannya, lalu hapus komentar ini.
  { pertanyaan: "Setelah jadi, siapa yang merawat?", jawaban: null },
];

/** Hanya pertanyaan yang sudah punya jawaban. */
export function faqTampil() {
  return faq.filter((f): f is Faq & { jawaban: string } => f.jawaban !== null);
}
