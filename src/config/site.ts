/**
 * Pengaturan utama situs. Ubah di sini — semua komponen membaca dari file ini.
 */
export const site = {
  nama: "Tito Hanafi",
  // Domain final. Bisa juga di-override lewat env NEXT_PUBLIC_SITE_URL.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  // Untuk preview link (WhatsApp, Instagram, dsb.)
  judulSeo: "Tito Hanafi — Desainer Perwakilan Rakyat",
  deskripsiSeo:
    "9+ tahun mendesain layanan digital di pemerintahan, lalu mendirikan yayasan pendidikan. Sekarang terbuka untuk diskusi produk atau ide yang ingin kamu kembangkan.",

  // TODO: ganti dengan nomor WhatsApp asli (format internasional, tanpa + dan spasi)
  whatsapp: "6281234567890",
  // TODO: ganti dengan email asli
  email: "halo@titohanafi.com",

  // TODO: ganti dengan foto asli (taruh di /public/images/)
  foto: "/images/foto-tito-placeholder.svg",

  // Tampilkan kartu "Contoh" di segmen Apa yang Saya Pikirkan.
  // Set ke false sebelum rilis — kalau belum ada konten asli, empty state yang tampil.
  tampilkanContoh: true,

  tautan: {
    bantuan: "/bantuan",
    laporanKerja: "/laporan-kerja",
    tera: "/tera",
    ngobrol: "#ngobrol",
  },
} as const;

export function linkWhatsApp(pesan?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return pesan ? `${base}?text=${encodeURIComponent(pesan)}` : base;
}
