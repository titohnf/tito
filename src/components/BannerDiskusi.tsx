import { linkWhatsApp } from "@/config/site";
import styles from "./BannerDiskusi.module.css";

const topik = [
  "Website usaha kecil",
  "Toko online",
  "Website bimbel & sekolah",
  "Sistem pendaftaran",
  "Aplikasi internal",
  "Dashboard & laporan",
  "Rapikan alur kerja",
  "Otomasi kerjaan berulang",
  "Redesain website lama",
  "Belajar bikin web sendiri",
  "Ide yang masih mentah",
  "Company profile",
  "Landing page",
  "Katalog produk",
  "Sistem booking",
  "Jadwal & absensi",
  "Portal layanan publik",
  "Riset pengguna",
  "Desain UI/UX",
  "Prototipe cepat",
  "Website portofolio",
  "Pembayaran online",
  "Integrasi WhatsApp",
  "SEO dasar",
  "Kelola data pelanggan",
  "Formulir & survei",
  "Aplikasi untuk UMKM",
  "Kelas & pelatihan online",
  "Chatbot & AI untuk usaha",
  "Pindah dari spreadsheet",
  "Belum tahu mulai dari mana",
];

/**
 * Banner ajakan di bawah papan testimoni: kartu gelap dengan semburat warna,
 * daftar topik yang berjalan naik, dan tombol WhatsApp. Pesan pembukanya
 * sudah terisi supaya pengunjung tinggal kirim.
 */
export function BannerDiskusi() {
  return (
    <aside className={styles.banner} aria-labelledby="banner-diskusi-judul">
      <div className={styles.isi}>
        <h3 id="banner-diskusi-judul" className={styles.judul}>
          Butuh teman untuk mendiskusikan projekmu?
        </h3>
        <p className={styles.deskripsi}>
          Saya siap membantu. Belum punya gambaran jelas juga tidak apa-apa — ceritakan saja apa yang
          ada di kepalamu, nanti kita rapikan bareng.
        </p>

        <a
          className={styles.tombol}
          href={linkWhatsApp("Halo Tito, saya mau diskusi soal projek saya.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi via WhatsApp <span aria-hidden="true">→</span>
        </a>
      </div>

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
    </aside>
  );
}
