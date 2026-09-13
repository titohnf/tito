import type { Metadata } from "next";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Laporan kerja",
};

// TODO: halaman ini masih placeholder — isi dengan studi kasus proyek.
export default function LaporanKerja() {
  return (
    <HalamanSederhana label="Segera hadir" judul="Laporan kerja">
      <p>Halaman ini lagi saya siapkan.</p>
      <div className="aksi">
        <Tombol href="/#oleh-rakyat" varian="garis">
          Kembali ke cerita Oleh Rakyat
        </Tombol>
        <Tombol href={`/${site.tautan.ngobrol}`}>Ayo ngobrol</Tombol>
      </div>
    </HalamanSederhana>
  );
}
