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
  judulSeo: "Tito Hanafi — Jasa Website untuk Usaha Kecil",
  deskripsiSeo:
    "Saya bantu usaha kecil punya website yang rapi dan gampang dipakai pelanggan. 9 tahun mendesain layanan digital pemerintah. Ngobrol dulu, gratis.",

  // Nomor WhatsApp, format internasional tanpa + dan spasi (0812-1219-4626).
  whatsapp: "6281212194626",
  // TODO: ganti dengan email asli
  email: "halo@titohanafi.com",

  // Ganti nama file setiap kali foto diganti, supaya cache gambar ikut diperbarui
  // Versi 80×80 px, ditampilkan pixelated. Buat ulang dari foto asli:
  // sips -s format png -z 80 80 public/images/foto-tito-4.jpg --out public/images/foto-tito-4-piksel.png
  foto: "/images/foto-tito-4-piksel.png",
  // Versi jelas, tampil setelah foto "dicoblos" di hero
  fotoAsli: "/images/foto-tito-4.jpg",

  // Tampilkan kartu "Contoh" di segmen Apa yang Saya Pikirkan.
  // Set ke false sebelum rilis — kalau belum ada konten asli, empty state yang tampil.
  tampilkanContoh: true,

  // Jenis konten yang tampil di "Apa yang saya pikirkan".
  // Tambahkan "pemikiran" / "video" lagi kalau sudah siap — datanya tetap tersimpan di src/content/konten.ts.
  tipeKontenAktif: ["tulisan"] as ("tulisan" | "pemikiran" | "video")[],

  tautan: {
    // Segmen "Layanan" di beranda.
    // Dari halaman lain, tautannya perlu diawali "/" — lihat pemakaian `ngobrol`.
    layanan: "#layanan",
    rekamJejak: "/rekam-jejak",
    pembelajaran: "/pembelajaran",
    tera: "/rekam-jejak/tera",
    ngobrol: "#ngobrol",
  },
} as const;

export function linkWhatsApp(pesan?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return pesan ? `${base}?text=${encodeURIComponent(pesan)}` : base;
}
