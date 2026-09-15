/**
 * Testimoni dari rekan/atasan, mitra Tera, atau orang tua murid.
 * Bagian testimoni di beranda otomatis tersembunyi selama array ini kosong.
 *
 * Contoh format:
 *   { kutipan: "…", nama: "Nama Orang", peran: "Product Lead, INA Digital" },
 */
export type Testimoni = { kutipan: string; nama: string; peran: string };

export const testimoni: Testimoni[] = [];
