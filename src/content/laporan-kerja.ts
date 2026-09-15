/**
 * Kartu di halaman /rekam-jejak.
 * `ringkasan` = 2–3 kalimat: masalahnya apa, peran saya apa, hasilnya apa.
 * Selama ringkasan kosong, kartu hanya menampilkan nama instansi & tim.
 */
export type LaporanKerja = { instansi: string; tim: string; ringkasan?: string };

export const laporanKerja: LaporanKerja[] = [
  { instansi: "Kominfo", tim: "Sekarang Komdigi" },
  { instansi: "Pemprov DKI Jakarta", tim: "JSC" },
  { instansi: "Peruri", tim: "INA Digital" },
  { instansi: "Kemendikdasmen", tim: "INA Digital Edu" },
];
