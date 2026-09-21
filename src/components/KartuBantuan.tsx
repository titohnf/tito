"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CircleCheck, Code2, X } from "lucide-react";
import { layanan, type Layanan } from "@/content/cta";
import { linkWhatsApp } from "@/config/site";
import { Tombol } from "./Tombol";
import { IkonAi, IkonAudit, IkonNgobrol, IkonWeb } from "./Ikon3D";
import kartu from "./KartuGrid.module.css";
import tombol from "./Tombol.module.css";
import styles from "./KartuBantuan.module.css";

/**
 * Ikon 3D per layanan, dipetakan dari id-nya. Ikonnya dipakai bersama dengan
 * tempat lain di situs (lihat Ikon3D.tsx) — gelembung obrolan di kartu diskusi
 * sama persis dengan yang dipakai blok ajakan ngobrol.
 */
const ikon: Record<string, (p: { className?: string }) => React.ReactElement> = {
  website: IkonWeb,
  audit: IkonAudit,
  ngobrol: IkonNgobrol,
  ai: IkonAi,
};

/**
 * Empat kartu layanan di bab Pendamping (segmen Tentang) dan halaman /bantuan.
 * Diklik membuka pop up berisi detail layanan — isinya masih placeholder.
 */
export function KartuBantuan() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [aktif, setAktif] = useState<Layanan | null>(null);

  const buka = (l: Layanan) => {
    setAktif(l);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <ul className={`${kartu.grid} ${kartu.grid3} ${styles.daftar}`}>
        {layanan.map((l) => {
          const Ikon = ikon[l.id] ?? IkonWeb;

          /*
           * Kartu lebar punya dua aksi, jadi kartunya tidak bisa jadi satu tombol
           * besar seperti yang lain — tombol di dalam tombol tidak sah dan
           * kliknya jadi rebutan. Di sini kartunya <div> biasa, dan yang bisa
           * diklik cuma dua tombol di bawah teksnya.
           */
          if (l.lebar) {
            return (
              <li key={l.id} className={styles.sorot}>
                <div className={`${kartu.kartu} ${styles.kartu} ${styles.kartuLebar}`}>
                  <div className={styles.isiLebar}>
                    <span className={styles.kepala}>
                      <Ikon className={styles.ikon} />
                    </span>
                    <h3 className={kartu.namaKartu}>{l.judul}</h3>
                    <p className={kartu.ringkasan}>{l.teks}</p>
                    <div className={styles.aksiKartu}>
                      <button
                        type="button"
                        className={`${tombol.tombol} ${tombol.garis}`}
                        onClick={() => buka(l)}
                      >
                        Pelajari Selengkapnya <span aria-hidden="true">→</span>
                      </button>
                      {l.tombolDaftar && (
                        <Tombol href={linkWhatsApp(l.tombolDaftar.pesan)} eksternal>
                          {l.tombolDaftar.label} <span aria-hidden="true">→</span>
                        </Tombol>
                      )}
                    </div>
                  </div>

                  {/*
                   * Panggung foto: noda berwarna sebagai alas, panel kode dan
                   * pratinjau web di belakang orangnya, serta dua gelembung
                   * penanda di depannya.
                   * Fotonya latar-tembus, jadi ia duduk langsung di atas noda
                   * itu tanpa bingkai. Ukuran aslinya dioper supaya rasio
                   * ruangnya sudah dipesan sebelum gambarnya turun.
                   */}
                  <div className={styles.panggung}>
                    <span className={styles.noda} aria-hidden="true" />

                    {/*
                     * Satu panel gelap: editor kode di belakang bahunya.
                     * Disusun dari kotak CSS, bukan gambar — isinya teks, jadi
                     * tetap tajam di layar mana pun dan gampang diubah.
                     *
                     * <b>/<u>/<i>/<s> di dalamnya cuma kait warna (kata kunci,
                     * nama tag, teks dalam kutip, nomor baris), bukan penekanan
                     * — seluruh panelnya aria-hidden.
                     */}
                    {/* Pratinjau web kecil yang mengambang di atas tutup laptop:
                        hasil dari kode di panel belakangnya. Isinya blok warna,
                        bukan teks — di ukuran sekecil ini huruf tidak terbaca.
                        Susunannya meniru halaman beneran: hero (teks + tombol +
                        gambar) lalu tiga kartu di bawahnya. */}
                    <span className={styles.pratinjau} aria-hidden="true">
                      <span className={styles.bilahPratinjau}>
                        <i />
                        <i />
                        <i />
                      </span>

                      <span className={styles.isiPratinjau}>
                        <span className={styles.heroPratinjau}>
                          <span className={styles.teksHero}>
                            <i />
                            <i />
                            <i />
                            <b />
                          </span>
                          <span className={styles.gambarHero} />
                        </span>

                        <span className={styles.kartuPratinjau}>
                          <span>
                            <u />
                            <i />
                            <i />
                          </span>
                          <span>
                            <u />
                            <i />
                            <i />
                          </span>
                          <span>
                            <u />
                            <i />
                            <i />
                          </span>
                        </span>
                      </span>
                    </span>

                    <span className={`${styles.panel} ${styles.layar}`} aria-hidden="true">
                      <span className={styles.bilahLayar}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={styles.badanLayar}>
                        {/* Daftar berkas di sisi kiri, seperti panel samping di
                            editor betulan. Ia yang ditaruh di kiri, bukan
                            kodenya: sisi kiri panel tertutup kepala orangnya,
                            dan kode yang tidak terbaca jadi sia-sia. */}
                        <span className={styles.berkas}>
                          <i />
                          <i className={styles.berkasAktif} />
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                      <code className={styles.kode}>
                        <span>
                          <s>1</s>
                          <b>export default</b>
                        </span>
                        <span>
                          <s>2</s>
                          <b>function</b> <u>Halaman</u>() {"{"}
                        </span>
                        <span>
                          <s>3</s>
                          {"\u00a0\u00a0"}<b>return</b> (
                        </span>
                        <span>
                          <s>4</s>
                          {"\u00a0\u00a0\u00a0\u00a0"}&lt;<u>Hero</u>
                        </span>
                        <span>
                          <s>5</s>
                          {"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}judul=<i>&quot;Toko Bu Ani&quot;</i>
                        </span>
                        <span>
                          <s>6</s>
                          {"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}pesan=<i>&quot;Pesan di sini&quot;</i>
                        </span>
                        <span>
                          <s>7</s>
                          {"\u00a0\u00a0\u00a0\u00a0"}/&gt;
                        </span>
                        <span>
                          <s>8</s>
                          {"\u00a0\u00a0\u00a0\u00a0"}&lt;<u>DaftarProduk</u> /&gt;
                        </span>
                        <span>
                          <s>9</s>
                          {"\u00a0\u00a0\u00a0\u00a0"}&lt;<u>TombolWA</u> /&gt;
                        </span>
                        <span>
                          <s>10</s>
                          {"\u00a0\u00a0"})
                        </span>
                        <span>
                          <s>11</s>
                          {"}"}
                        </span>
                      </code>

                      </span>
                    </span>

                    {/* Gelembung "AI": badan gradien biru-ungu dengan ekor di
                        kiri-bawah dan kilau di depan tulisannya. Duduk di depan
                        foto — ia penanda, bukan bagian adegan di belakang.
                        aria-hidden: hiasan, tidak menambah apa pun buat
                        pembaca layar. */}
                    <span className={styles.bisik} aria-hidden="true">
                      <svg className={styles.kilauAi} viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6.6 0c.9 4.6 1.6 5.3 6.2 6.2-4.6.9-5.3 1.6-6.2 6.2-.9-4.6-1.6-5.3-6.2-6.2C5 5.3 5.7 4.6 6.6 0Z" />
                        <path d="M13 9.2c.4 2 .7 2.3 2.7 2.7-2 .4-2.3.7-2.7 2.7-.4-2-.7-2.3-2.7-2.7 2-.4 2.3-.7 2.7-2.7Z" />
                      </svg>
                      AI
                    </span>

                    {/* Sisi kanan foto: satu lencana ikon kode (lucide-react,
                        pustaka ikon sumber terbuka yang sudah dipakai situs ini)
                        dan satu pita janji. Pitanya tidak aria-hidden — beda
                        dengan ornamen lain, kalimatnya membawa arti. */}
                    <span className={`${styles.lencana} ${styles.lencanaAtas}`} aria-hidden="true">
                      <Code2 size={20} strokeWidth={2} />
                    </span>
                    <span className={styles.janji}>
                      <CircleCheck size={15} strokeWidth={2.2} aria-hidden="true" />
                      Diajarin sampai bisa
                    </span>

                    <Image
                      src="/images/kelas-ai.png"
                      alt="Seseorang mengerjakan websitenya sendiri di laptop"
                      width={1009}
                      height={751}
                      sizes="(min-width: 760px) 23rem, 24rem"
                      className={styles.foto}
                    />

                  </div>
                </div>
              </li>
            );
          }

          return (
            <li key={l.id}>
              <button type="button" className={`${kartu.kartu} ${styles.kartu}`} onClick={() => buka(l)}>
                <span className={styles.kepala}>
                  <Ikon className={styles.ikon} />
                </span>
                <h3 className={kartu.namaKartu}>{l.judul}</h3>
                <p className={kartu.ringkasan}>{l.teks}</p>
                <p className={kartu.status}>
                  Pelajari Selengkapnya <span aria-hidden="true">→</span>
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Satu dialog dipakai ulang untuk semua kartu; isinya mengikuti kartu yang diklik.
          <dialog> dipilih supaya Esc, fokus, dan backdrop-nya ditangani browser. */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        /* Isi sengaja tidak dikosongkan saat ditutup: kalau dikosongkan, membuka
           lagi sempat menampilkan dialog kosong sepersekian detik. */
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {aktif && (
          <div className={styles.isiDialog}>
            <button
              type="button"
              className={styles.tutup}
              onClick={() => dialogRef.current?.close()}
              aria-label="Tutup"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <h2 className={styles.judulDialog}>{aktif.judulDetail}</h2>

            {aktif.detail.map((bagian) => (
              <section key={bagian.judul} className={styles.bagian}>
                <h3 className={styles.judulBagian}>{bagian.judul}</h3>
                {bagian.paragraf && <p className={styles.teksDialog}>{bagian.paragraf}</p>}
                {bagian.langkah && (
                  <ol className={styles.langkah}>
                    {bagian.langkah.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            <div className={styles.aksiDialog}>
              <Tombol href={linkWhatsApp(aktif.pesan)} eksternal>
                Ngobrol Sekarang <span aria-hidden="true">→</span>
              </Tombol>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
