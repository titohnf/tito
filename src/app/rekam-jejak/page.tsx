import type { Metadata } from "next";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { DaftarRekamJejak } from "@/components/DaftarRekamJejak";
import { laporanKerja } from "@/content/laporan-kerja";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Rekam Jejak",
};

export default function RekamJejak() {
  return (
    <HalamanSederhana judul="Rekam Jejak" lebar kembali={false}>
      <p>Instansi dan tim tempat saya merancang layanan digital.</p>

      <DaftarRekamJejak items={laporanKerja} />

      <div className="aksi">
        <Tombol href={`/${site.tautan.ngobrol}`}>
          Ayo ngobrol <span aria-hidden="true">→</span>
        </Tombol>
      </div>
    </HalamanSederhana>
  );
}
