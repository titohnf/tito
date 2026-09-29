import type { Metadata } from "next";
import { HalamanGalat } from "@/components/HalamanGalat";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <HalamanGalat
      label="404"
      judul="Halaman tidak ditemukan"
      teks="Alamat yang kamu tuju tidak ada, atau sudah dipindah. Coba kembali ke beranda, atau langsung ngobrol soal kebutuhan usahamu."
    />
  );
}
