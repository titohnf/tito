import type { Metadata } from "next";
import { HalamanSederhana } from "@/components/HalamanSederhana";
import { Tombol } from "@/components/Tombol";
import { alurKerja, kebutuhan, pesanKebutuhan, pesanUmum } from "@/content/cta";
import { tentang } from "@/content/profil";
import { linkWhatsApp } from "@/config/site";
import styles from "@/components/KartuGrid.module.css";

export const metadata: Metadata = {
  title: "Apa yang bisa saya bantu",
};

const pendamping = tentang.find((b) => b.id === "pendamping");
const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Bantuan() {
  return (
    <HalamanSederhana label={pendamping?.label ?? "Bantuan"} judul="Apa yang bisa saya bantu" lebar>
      {pendamping?.paragraf.map((p) => (
        <p key={p}>{p}</p>
      ))}

      <h2 className={styles.subjudul}>Biasanya saya bantu kalau kamu…</h2>
      <ul className={styles.grid}>
        {kebutuhan.map((k, i) => (
          <li key={k.id}>
            <a
              href={linkWhatsApp(pesanKebutuhan(k))}
              className={styles.kartu}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.nomor}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.namaKartu}>{kapital(k.label)}</h3>
              <p className={styles.status}>
                Chat di WhatsApp <span aria-hidden="true">↗</span>
              </p>
            </a>
          </li>
        ))}
      </ul>

      <h2 className={styles.subjudul}>Cara kerjanya</h2>
      <ol className={styles.alur}>
        {alurKerja.map((langkah) => (
          <li key={langkah}>{langkah}</li>
        ))}
      </ol>

      <div className="aksi">
        <Tombol href={linkWhatsApp(pesanUmum)} eksternal>
          Chat di WhatsApp <span aria-hidden="true">↗</span>
        </Tombol>
      </div>
    </HalamanSederhana>
  );
}
