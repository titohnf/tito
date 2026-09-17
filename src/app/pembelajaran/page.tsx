import type { Metadata } from "next";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { GridKonten } from "@/components/GridKonten";
import { kontenTampil } from "@/content/konten";

export const metadata: Metadata = {
  title: "Pembelajaran",
};

export default function Pembelajaran() {
  return (
    <HalamanSederhana judul="Pembelajaran" lebar kembali={false}>
      <p>Hal-hal yang saya pelajari selama merancang layanan publik dan membangun Tera.</p>
      <div style={{ marginTop: "2rem" }}>
        <GridKonten items={kontenTampil()} tabSegmen />
      </div>
    </HalamanSederhana>
  );
}
