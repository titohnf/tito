import { Kepala } from "@/components/Kepala";
import { Hero } from "@/components/Hero";
import { Pernyataan } from "@/components/Pernyataan";
import { Tentang } from "@/components/Tentang";
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
        <Pernyataan />
        <Tentang />
        <CtaInteraktif />
      </main>
      <Kaki sambung />
    </>
  );
}
