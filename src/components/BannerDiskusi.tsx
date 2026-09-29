import { linkWhatsApp } from "@/config/site";
import styles from "./BannerDiskusi.module.css";

/** Jenis-jenis sistem yang bisa saya bangun; tampil sebagai daftar berjalan di banner. */
const topik = [
  "Sistem bimbel & sekolah",
  "Manajemen siswa & kelas",
  "Jadwal & absensi",
  "Tagihan & pembayaran",
  "Laporan perkembangan otomatis",
  "Portal orang tua",
  "Latihan & ujian online",
  "Pendaftaran online",
  "Booking & reservasi",
  "Pencatatan penjualan",
  "Stok & inventaris",
  "Katalog & pemesanan produk",
  "Data pelanggan (CRM)",
  "Dashboard & laporan usaha",
  "Keuangan & pembukuan sederhana",
  "Honor & gaji tim",
  "Keanggotaan & langganan",
  "Pengingat lewat WhatsApp",
  "Formulir & survei",
  "Surat & dokumen otomatis",
  "Antrean layanan",
  "Tugas & proyek tim",
  "Donasi & relawan",
  "Portal layanan publik",
  "Aplikasi internal tim",
  "Pindah dari spreadsheet",
];

/**
 * Banner ajakan di bawah papan testimoni: kartu gelap dengan semburat warna,
 * daftar topik yang berjalan naik, dan tombol WhatsApp. Pesan pembukanya
 * sudah terisi supaya pengunjung tinggal kirim.
 */
export function BannerDiskusi() {
  // Anak langsung <aside> (judul, jendela topik, deskripsi, tombol) ditata grid:
  // di HP bertumpuk berurutan sesuai kode ini, di layar lebar jendela topik
  // pindah ke kolom kanan (lihat BannerDiskusi.module.css).
  return (
    <aside className={styles.banner} aria-labelledby="banner-diskusi-judul">
      <h3 id="banner-diskusi-judul" className={styles.judul}>
        Ingin punya sistem untuk bisnismu sendiri?
      </h3>

      {/* Daftar topik berjalan dari bawah ke atas. Daftarnya diduplikasi supaya
          putarannya mulus; salinan kedua disembunyikan dari pembaca layar. */}
      <div className={styles.jendela}>
        <div className={styles.gulir}>
          <ul className={styles.trek}>
            {topik.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ul className={styles.trek} aria-hidden="true">
            {topik.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className={styles.deskripsi}>
        Dari pencatatan, jadwal, sampai laporan otomatis — saya bantu bikin sistem yang pas dengan
        cara kerja usahamu.
      </p>

      <a
        className={styles.tombol}
        href={linkWhatsApp("Halo Tito, saya mau bikin sistem untuk bisnis saya. Boleh ngobrol dulu?")}
        target="_blank"
        rel="noopener noreferrer"
      >
        Hubungi via WhatsApp <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
