import { Kepala } from "@/components/Kepala";
import { Hero } from "@/components/Hero";
import { Tentang } from "@/components/Tentang";
import { Pikiran } from "@/components/Pikiran";
import { CtaInteraktif } from "@/components/CtaInteraktif";
import { Kaki } from "@/components/Kaki";

export default function Beranda() {
  return (
    <>
      <Kepala />
      <main>
        <Hero />
        <Tentang />
        <Pikiran />
        <CtaInteraktif />
      </main>
      <Kaki />
    </>
  );
}
