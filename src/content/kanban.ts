export type StatusIde = "menunggu" | "proses" | "selesai";

/** Asal projek: untuk klien berbayar, untuk usaha sendiri, atau milik pribadi di luar usaha. */
export type JenisIde = "klien" | "usaha" | "pribadi";

export type Ide = {
  teks: string;
  status: StatusIde;
  /** Konteks projek; tampil sebagai label kecil di kartu. Kosong = tanpa label. */
  jenis?: JenisIde;
  /** URL hasilnya (alamat lengkap, dibuka di tab baru); hanya dipakai untuk projek yang sudah selesai. */
  tautan?: string;
};

/**
 * Papan projek di bawah hero. Edit file ini untuk mengubah isi dan urutan kartu: urutan di
 * sini = urutan tampil di dalam tiap kolom statusnya. Tanggal "Update terakhir" tidak
 * ditulis manual — diambil otomatis dari commit terakhir file ini (lihat
 * `src/lib/tanggal-commit.ts`).
 */
export const daftarIde: { judul: string; butir: Ide[] } = {
  judul: "Daftar Projek",
  butir: [
    { teks: "Membuat website pribadi", status: "selesai", jenis: "pribadi", tautan: "https://www.titohanafi.com" },
    { teks: "Membuat website Bimbel Tera", status: "selesai", jenis: "usaha", tautan: "https://bimbeltera.com" },
    { teks: "Membuat website komunitas Insan Tera", status: "selesai", jenis: "pribadi", tautan: "https://komunitas.tera.or.id/" },
    { teks: "Membuat aplikasi fondasi matematika", status: "proses", jenis: "usaha" },
    // TODO: tambahkan `tautan: "/studi-kasus/dasbor-tutor-orang-tua"` begitu cerita studi kasusnya tayang.
    { teks: "Membuat dashboard Bimbel Tera", status: "selesai", jenis: "usaha" },
    { teks: "Membuat aplikasi penguasaan materi matematika", status: "proses", jenis: "usaha" },
    { teks: "Membuat tools pembuatan soal", status: "menunggu", jenis: "usaha" },
    { teks: "Membuat sistem pencatatan keuangan", status: "menunggu", jenis: "pribadi" },
  ],
};
