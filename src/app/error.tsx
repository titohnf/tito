"use client";

import { useEffect } from "react";
import { HalamanGalat } from "@/components/HalamanGalat";
import tombol from "@/components/Tombol.module.css";

export default function Galat({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <HalamanGalat
      label="Galat"
      judul="Ada yang tidak beres"
      teks="Halaman ini gagal dimuat. Coba lagi sebentar, atau kembali ke beranda."
      aksiUlang={
        <button type="button" className={`${tombol.tombol} ${tombol.utama}`} onClick={() => retry()}>
          Coba lagi
        </button>
      }
    />
  );
}
