import { Kepala } from "@/components/Kepala";
import { Hero } from "@/components/Hero";
import { Pencapaian } from "@/components/Pencapaian";
import { Tentang } from "@/components/Tentang";
import { Testimoni } from "@/components/Testimoni";
import { CtaInteraktif } from "@/components/CtaInteraktif";
import { Kaki } from "@/components/Kaki";
import { tentang } from "@/content/profil";

export default function Beranda() {
  return (
    <>
      <Kepala />
      <main>
        <Hero />
        <Pencapaian />
        <Tentang bab={tentang} />
        <Testimoni />
        <CtaInteraktif />
      </main>
      <Kaki />
    </>
  );
}
