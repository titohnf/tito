import { Kepala } from "@/components/Kepala";
import { Hero } from "@/components/Hero";
import { Mockup } from "@/components/Mockup";
import { Bantuan } from "@/components/Bantuan";
import { Portofolio } from "@/components/Portofolio";
import { Tentang } from "@/components/Tentang";
import { PertanyaanUmum } from "@/components/PertanyaanUmum";
import { CtaInteraktif } from "@/components/CtaInteraktif";
import { Kaki } from "@/components/Kaki";
import styles from "./page.module.css";

export default function Beranda() {
  return (
    <>
      <Kepala />
      <main>
        <div className={styles.atas}>
          <Hero />
        </div>
        <Mockup />
        <Bantuan />
        <Portofolio />
        <Tentang />
        <PertanyaanUmum />
        <CtaInteraktif />
      </main>
      <Kaki />
    </>
  );
}
