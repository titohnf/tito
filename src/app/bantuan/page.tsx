import type { Metadata } from "next";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { site, linkWhatsApp } from "@/config/site";

export const metadata: Metadata = {
  title: "Apa yang bisa saya bantu",
};

// TODO: halaman ini masih placeholder — isi dengan layanan yang ditawarkan.
export default function Bantuan() {
  return (
    <HalamanSederhana label="Segera hadir" judul="Apa yang bisa saya bantu">
      <p>Halaman ini lagi saya siapkan.</p>
      <p>Sambil nunggu, kamu bisa langsung cerita kebutuhanmu. Ngobrol dulu gratis, nggak ada komitmen.</p>
      <div className="aksi">
        <Tombol href={linkWhatsApp("Halo Tito, saya mau ngobrol soal produk/ide saya.")} eksternal>
          Chat via WhatsApp
        </Tombol>
        <Tombol href={`/${site.tautan.ngobrol}`} varian="garis">
          Pilih kebutuhan kamu
        </Tombol>
      </div>
    </HalamanSederhana>
  );
}
