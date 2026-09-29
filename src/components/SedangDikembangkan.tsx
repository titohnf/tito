import { Kepala } from "./Kepala";
import { Tombol } from "./Tombol";
import { IkonPengembangan } from "./Ikon3D";
import { site } from "@/config/site";
import styles from "./SedangDikembangkan.module.css";

/**
 * Halaman sementara untuk bagian yang kontennya belum siap (Rekam Jejak dan
 * Pembelajaran): rata tengah, ikon 3D di atas judul, tanpa footer. Kode
 * halaman aslinya masih ada di berkas masing-masing, dalam bentuk komentar —
 * tinggal dikembalikan begitu kontennya ada.
 */
export function SedangDikembangkan({ bagian }: { bagian: string }) {
  return (
    <>
      <Kepala />
      <main className={`wadah ${styles.halaman}`}>
        <IkonPengembangan className={styles.ikon} />
        <p className="label">{bagian}</p>
        <h1 className={styles.judul}>Sedang dalam pengembangan</h1>
        <p className={styles.teks}>
          Halaman {bagian} masih saya siapkan. Sambil menunggu, kamu bisa lihat contoh pekerjaan di
          beranda, atau langsung ngobrol soal kebutuhan usahamu.
        </p>
        <div className={styles.aksi}>
          <Tombol href="/">Kembali ke beranda</Tombol>
          <Tombol href={`/${site.tautan.ngobrol}`} varian="garis">
            Ayo ngobrol <span aria-hidden="true">→</span>
          </Tombol>
        </div>
      </main>
    </>
  );
}
