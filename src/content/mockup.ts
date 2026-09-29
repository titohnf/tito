/**
 * Carousel mockup website di hero. Menampilkan situs aslinya lewat iframe
 * (bukan screenshot statis), supaya animasi di masing-masing hero tetap
 * kelihatan. `href` wajib diisi domain yang benar-benar live.
 */
export type Mockup = { id: string; judul: string; href: string };

export const mockup: Mockup[] = [
  { id: "bimbel-tera", judul: "Bimbel Tera", href: "https://bimbeltera.com" },
  { id: "tera-foundation", judul: "Tera Foundation", href: "https://www.terafoundation.or.id" },
  { id: "komunitas-tera", judul: "Komunitas Tera", href: "https://komunitas.tera.or.id" },
];
