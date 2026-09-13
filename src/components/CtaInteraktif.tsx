"use client";

import { useId, useState } from "react";
import { peran, kebutuhan, susunPesan, catatanCta } from "@/content/cta";
import { linkWhatsApp } from "@/config/site";
import styles from "./CtaInteraktif.module.css";

export function CtaInteraktif() {
  const [peranId, setPeranId] = useState("");
  const [kebutuhanId, setKebutuhanId] = useState("");
  const idPeran = useId();
  const idKebutuhan = useId();

  const peranTerpilih = peran.find((p) => p.id === peranId);
  const opsiKebutuhan = peranId ? kebutuhan.filter((k) => k.untuk.includes(peranId)) : kebutuhan;
  const kebutuhanTerpilih = opsiKebutuhan.find((k) => k.id === kebutuhanId);
  const lengkap = peranTerpilih && kebutuhanTerpilih;
  const pesan = lengkap ? susunPesan(peranTerpilih, kebutuhanTerpilih) : "";

  function gantiPeran(id: string) {
    setPeranId(id);
    // Reset kebutuhan kalau tidak berlaku untuk peran baru
    if (!kebutuhan.find((k) => k.id === kebutuhanId)?.untuk.includes(id)) {
      setKebutuhanId("");
    }
  }

  return (
    <section id="ngobrol" className={`wadah ${styles.cta}`} aria-labelledby="ngobrol-judul">
      <div className={styles.panel}>
        <h2 id="ngobrol-judul" className="label">
          Ayo ngobrol
        </h2>

        <form className={styles.kalimat} onSubmit={(e) => e.preventDefault()}>
          <span>Kamu seorang </span>
          <label htmlFor={idPeran} className="sr-only">
            Kamu seorang
          </label>
          <span className={styles.menempel}>
            <span className={styles.pilihWadah}>
              <span className={styles.cermin} aria-hidden="true">
                {peranTerpilih?.label ?? "pilih…"}
              </span>
              <select
                id={idPeran}
                className={styles.pilih}
                value={peranId}
                onChange={(e) => gantiPeran(e.target.value)}
                data-kosong={!peranId}
              >
                <option value="" disabled>
                  pilih…
                </option>
                {peran.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </span>,
          </span>
          <span> dan saat ini kamu.. </span>
          <label htmlFor={idKebutuhan} className="sr-only">
            dan saat ini kamu
          </label>
          <span className={styles.pilihWadah}>
            <span className={styles.cermin} aria-hidden="true">
              {kebutuhanTerpilih?.label ?? "pilih…"}
            </span>
            <select
              id={idKebutuhan}
              className={styles.pilih}
              value={kebutuhanTerpilih ? kebutuhanId : ""}
              onChange={(e) => setKebutuhanId(e.target.value)}
              data-kosong={!kebutuhanTerpilih}
            >
              <option value="" disabled>
                pilih…
              </option>
              {opsiKebutuhan.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </span>
        </form>

        <div className={styles.hasil} data-tampil={Boolean(lengkap)} aria-live="polite">
          {lengkap ? (
            <>
              <p className={`label ${styles.labelPesan}`}>Pesan pembuka</p>
              <p className={styles.gelembung}>{pesan}</p>
              <div className={styles.aksi}>
                <a
                  href={linkWhatsApp(pesan)}
                  className={styles.tombol}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ayo Ngobrol <span aria-hidden="true">→</span>
                </a>
                <p className={styles.catatan}>{catatanCta}</p>
              </div>
            </>
          ) : (
            <p className={styles.petunjuk}>
              Pilih dua-duanya, nanti saya siapkan pesan pembukanya.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
