/**
 * Pertanyaan yang sering muncul. Hanya yang `jawaban`-nya terisi yang tampil
 * di beranda — sisanya tetap tersimpan di sini sebagai draf.
 */
export type Faq = { pertanyaan: string; jawaban: string | null };

export const faq: Faq[] = [
  {
    pertanyaan: "Saya belum tahu butuh apa. Harus mulai dari mana?",
    jawaban:
      "Mulai dari cerita saja. Kirim pesan lewat WhatsApp, ceritakan usahamu dan apa yang bikin repot. Nanti saya bantu pilihkan mana yang paling perlu dikerjakan dulu. Tidak perlu paham istilah teknis, dan ngobrol pertama gratis.",
  },
  {
    pertanyaan: "Berapa biayanya?",
    jawaban:
      "Website sederhana mulai Rp 2,5 juta, sistem digital mulai Rp 5 juta, dan kelas belajar bikin website mulai Rp 750 ribu. Angka pastinya tergantung kebutuhanmu; saya kabari setelah kita ngobrol, tanpa kewajiban lanjut.",
  },
  {
    pertanyaan: "Berapa lama pengerjaannya?",
    jawaban:
      "Website biasanya selesai dalam hitungan minggu, bukan bulan. Sistem dikerjakan bertahap dari bagian yang paling penting, jadi kamu sudah bisa memakainya sebelum semuanya rampung.",
  },
  {
    pertanyaan: "Apa yang perlu saya siapkan?",
    jawaban:
      "Untuk website: logo (kalau ada), foto produk, dan info dasar usaha. Untuk sistem: cukup ceritakan cara kerja usahamu sekarang, walau masih manual atau pakai spreadsheet. Belum punya semuanya? Kita mulai dari yang ada.",
  },
  {
    pertanyaan: "Kalau sudah jadi, siapa yang merawat?",
    jawaban:
      "Saya. Kalau ada yang error, saya perbaiki gratis selama 30 hari. Setelah itu ada paket perawatan bulanan (opsional) mulai Rp 300 ribu: cadangan data, pembaruan, ubah konten, dan perbaikan kecil. Mau mengurus sendiri? Saya bisa ajari lewat kelas.",
  },
];

/** Hanya pertanyaan yang sudah punya jawaban. */
export function faqTampil() {
  return faq.filter((f): f is Faq & { jawaban: string } => f.jawaban !== null);
}
