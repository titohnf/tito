/**
 * Carousel mockup website di hero. Menampilkan situs aslinya lewat iframe
 * (bukan screenshot statis), supaya animasi di masing-masing hero tetap
 * kelihatan. `href` wajib diisi domain yang benar-benar live.
 */
export type Mockup = {
  id: string;
  judul: string;
  href: string;
  /**
   * Rekaman scroll beranda (mp4 1440x720) yang diputar menggantikan iframe.
   * Kosongkan untuk tetap menampilkan situs aslinya lewat iframe.
   */
  video?: string;
  /** Bingkai diam yang tampil sebelum `video` siap diputar. */
  poster?: string;
};

export const mockup: Mockup[] = [
  { id: "bimbel-tera", judul: "Bimbel Tera", href: "https://bimbeltera.com" },
  {
    id: "tera-foundation",
    judul: "Tera Foundation",
    href: "https://www.terafoundation.or.id",
    video: "/videos/mockup-tera-foundation.mp4",
    poster: "/videos/mockup-tera-foundation-poster.jpg",
  },
  { id: "komunitas-tera", judul: "Komunitas Tera", href: "https://komunitas.tera.or.id" },
];
