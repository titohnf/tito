/**
 * Tiga segmen peran yang jadi tulang punggung situs ini (lihat `tentang` di profil.ts).
 * Dipakai sebagai tag di /rekam-jejak dan /pembelajaran supaya tiap item
 * kelihatan masuk peran yang mana.
 */
export type Segmen = "perwakilan" | "pelayan" | "pendamping";

export const labelSegmen: Record<Segmen, string> = {
  perwakilan: "Perwakilan",
  pelayan: "Pelayan",
  pendamping: "Pendamping",
};

/** Label panjang untuk baris "Kategori" di kartu rekam jejak. */
export const labelSegmenPanjang: Record<Segmen, string> = {
  perwakilan: "Perwakilan Rakyat",
  pelayan: "Pelayan Rakyat",
  pendamping: "Pendamping Rakyat",
};

export const daftarSegmen = Object.keys(labelSegmen) as Segmen[];
