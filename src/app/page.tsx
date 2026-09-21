import { Kepala } from "@/components/Kepala";
import { Hero } from "@/components/Hero";
import { Pencapaian } from "@/components/Pencapaian";
import { Tentang } from "@/components/Tentang";
import { Testimoni } from "@/components/Testimoni";
import { Bantuan } from "@/components/Bantuan";
import { CtaInteraktif } from "@/components/CtaInteraktif";
import { Kaki } from "@/components/Kaki";
import { tentang } from "@/content/profil";
import styles from "./page.module.css";

export default function Beranda() {
  return (
    <>
      <Kepala />
      <main>
        <div className={styles.atas}>
          <Hero />
          <Pencapaian />
        </div>
        <Tentang bab={tentang} />
        <Bantuan />
        <Testimoni />
        <CtaInteraktif />
      </main>
      <Kaki />
    </>
  );
}
