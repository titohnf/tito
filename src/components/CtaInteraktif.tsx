"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { peran, kebutuhan, susunPesan } from "@/content/cta";
import { linkWhatsApp } from "@/config/site";
import styles from "./CtaInteraktif.module.css";

export function CtaInteraktif() {
  const [peranId, setPeranId] = useState("");
  const [kebutuhanId, setKebutuhanId] = useState("");

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
    // Latar gelapnya harus penuh selebar layar, jadi .wadah turun jadi pembungkus
    // di dalam — sama seperti segmen Bantuan tepat di atasnya.
    <section id="ngobrol" className={styles.cta} aria-labelledby="ngobrol-judul">
      <div className="wadah">
        <div className={styles.panel}>
          <h2 id="ngobrol-judul" className={styles.judulPenutup}>
            Butuh teman untuk mendiskusikan projekmu?
          </h2>
          <p className={styles.subPenutup}>
            Hubungi saya dengan menceritakan siapa kamu dan apa kebutuhanmu. Saya akan balas
            secepatnya{" "}
            <Zap className={styles.kilat} size={18} aria-hidden="true" />
          </p>

          <form
            className={styles.kalimat}
            onSubmit={(e) => e.preventDefault()}
            aria-label="Ceritakan situasi dan kebutuhanmu"
          >
            <span aria-hidden="true">Saya </span>
            <span className={styles.menempel}>
              <span className={styles.pilihWadah}>
                <span className={styles.cermin} aria-hidden="true">
                  {peranTerpilih?.label ?? "pilih situasi…"}
                </span>
                <select
                  aria-label="Situasi saya"
                  className={styles.pilih}
                  value={peranId}
                  onChange={(e) => gantiPeran(e.target.value)}
                  data-kosong={!peranId}
                >
                  <option value="" disabled>
                    pilih situasi…
                  </option>
                  {peran.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </span>
            </span>
            <span aria-hidden="true"> dan </span>
            <span className={styles.pilihWadah}>
              <span className={styles.cermin} aria-hidden="true">
                {kebutuhanTerpilih?.label ?? "pilih kebutuhan…"}
              </span>
              <select
                aria-label="Yang saya butuhkan"
                className={styles.pilih}
                value={kebutuhanTerpilih ? kebutuhanId : ""}
                onChange={(e) => setKebutuhanId(e.target.value)}
                data-kosong={!kebutuhanTerpilih}
              >
                <option value="" disabled>
                  pilih kebutuhan…
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
                    Kirim ke WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </>
            ) : (
              <p className={styles.petunjuk}>
                Pilih dua-duanya, pesan pembukanya langsung muncul di sini.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
