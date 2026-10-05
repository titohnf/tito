"use client";

import Link from "next/link";
import { ArrowUpRight, GripVertical } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { daftarIde, type Ide, type JenisIde, type StatusIde } from "@/content/kanban";
import styles from "./DaftarIde.module.css";

// Urutan kolom seperti papan Kanban: dari yang belum dimulai sampai yang selesai.
const kolom: { status: StatusIde; judul: string }[] = [
  { status: "menunggu", judul: "Menunggu" },
  { status: "proses", judul: "Proses" },
  { status: "selesai", judul: "Selesai" },
];

const labelJenis: Record<JenisIde, string> = {
  klien: "Klien",
  usaha: "Usaha",
  pribadi: "Pribadi",
};

type Posisi = { top: number; left: number; width: number; height: number };
type Seret = { teks: string; dx: number; dy: number; di: StatusIde | null; r: Posisi };

/**
 * Papan Kanban Daftar ide: tiap ide berupa kartu yang bisa digeser antar kolom
 * (mouse atau sentuhan lewat pegangan di kanan; keyboard dengan panah kiri/kanan).
 * Posisi hanya tersimpan selama halaman terbuka. `diperbarui` = teks tanggal update terakhir,
 * dihitung di server (lihat Hero).
 */
export function DaftarIde({ diperbarui }: { diperbarui: string }) {
  const [ide, setIde] = useState<Ide[]>(daftarIde.butir);
  const [seret, setSeret] = useState<Seret | null>(null);

  const refKolom = useRef<Partial<Record<StatusIde, HTMLElement | null>>>({});
  const refCatatan = useRef(new Map<string, HTMLElement>());
  const awal = useRef<{ x: number; y: number; bergerak: boolean; r?: Posisi } | null>(null);
  const baruDiseret = useRef(false);

  function kolomDi(x: number, y: number): StatusIde | null {
    for (const { status } of kolom) {
      const r = refKolom.current[status]?.getBoundingClientRect();
      if (r && x >= r.left && x <= r.right && y >= r.top - 24 && y <= r.bottom + 24) {
        return status;
      }
    }
    return null;
  }

  /** Pindahkan ide ke kolom `status`; (x, y) menentukan urutan di grid catatan
   * (Infinity = paling akhir). */
  function pindah(teks: string, status: StatusIde, x: number, y: number) {
    setIde((prev) => {
      const item = prev.find((i) => i.teks === teks);
      if (!item) return prev;
      const sisa = prev.filter((i) => i.teks !== teks);
      const sebelum = sisa.find((n) => {
        if (n.status !== status) return false;
        const r = refCatatan.current.get(n.teks)?.getBoundingClientRect();
        if (!r) return false;
        // Urutan baca: baris di atas penunjuk dulu, lalu kiri-ke-kanan dalam barisnya.
        return y < r.top || (y <= r.bottom && x < r.left + r.width / 2);
      });
      const baru = { ...item, status };
      if (sebelum) {
        sisa.splice(sisa.indexOf(sebelum), 0, baru);
      } else {
        const terakhir = sisa.map((n) => n.status).lastIndexOf(status);
        sisa.splice(terakhir === -1 ? sisa.length : terakhir + 1, 0, baru);
      }
      return sisa;
    });
  }

  function mulaiSeret(e: React.PointerEvent<HTMLLIElement>) {
    if (e.button !== 0) return;
    // Sentuhan hanya dari pegangan, supaya halaman tetap bisa di-scroll lewat catatan.
    const dariPegangan = (e.target as HTMLElement).closest("[data-pegangan]");
    if (e.pointerType !== "mouse" && !dariPegangan) return;
    awal.current = { x: e.clientX, y: e.clientY, bergerak: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function geser(e: React.PointerEvent<HTMLLIElement>, teks: string) {
    const a = awal.current;
    if (!a) return;
    const dx = e.clientX - a.x;
    const dy = e.clientY - a.y;
    if (!a.bergerak && Math.hypot(dx, dy) < 5) return;
    // Posisi awal kartu dicatat sekali: selama diseret kartu dilepas dari daftar (position:fixed)
    // supaya tidak terpotong area scroll kolomnya.
    if (!a.bergerak) {
      const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
      a.r = { top, left, width, height };
    }
    a.bergerak = true;
    setSeret({ teks, dx, dy, di: kolomDi(e.clientX, e.clientY), r: a.r! });
  }

  function lepas(e: React.PointerEvent<HTMLLIElement>, teks: string) {
    const a = awal.current;
    awal.current = null;
    if (!a?.bergerak) return;
    const tujuan = kolomDi(e.clientX, e.clientY);
    if (tujuan) pindah(teks, tujuan, e.clientX, e.clientY);
    // Cegah klik tautan yang ikut terpicu setelah menyeret.
    baruDiseret.current = true;
    setTimeout(() => (baruDiseret.current = false), 0);
    setSeret(null);
  }

  function batal() {
    awal.current = null;
    setSeret(null);
  }

  function tombol(e: React.KeyboardEvent<HTMLLIElement>, item: Ide) {
    const arah = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!arah) return;
    const i = kolom.findIndex((k) => k.status === item.status) + arah;
    if (i < 0 || i >= kolom.length) return;
    e.preventDefault();
    pindah(item.teks, kolom[i].status, Infinity, Infinity);
    // Catatan dipasang ulang di kolom baru, jadi fokus dikembalikan sesudahnya.
    setTimeout(() => refCatatan.current.get(item.teks)?.focus(), 0);
  }

  return (
    <section className={styles.ide} aria-labelledby="daftar-ide-judul">
      <div className={styles.papan}>
        <div className={styles.kepala}>
          <h2 id="daftar-ide-judul" className={styles.judul}>
            {daftarIde.judul}
          </h2>
          <p className={styles.diperbarui}>Update terakhir: {diperbarui}</p>
        </div>
        <p id="petunjuk-ide" className={styles.sr}>
          Geser catatan antar kolom dengan mouse. Dengan keyboard, fokus ke catatan lalu
          tekan panah kiri atau kanan.
        </p>

        <div className={styles.kolomWadah}>
        {kolom.map(({ status, judul }) => {
          const isi = ide.filter((i) => i.status === status);
          return (
            <div
              key={status}
              ref={(el) => {
                refKolom.current[status] = el;
              }}
              className={`${styles.kolom} ${styles[status]} ${
                seret?.di === status ? styles.disasar : ""
              }`}
            >
              <h3 className={styles.judulKolom}>
                <span className={styles.titik} aria-hidden="true" />
                {judul}
                <span className={styles.jumlah} aria-label={`${isi.length} ide`}>
                  {isi.length}
                </span>
              </h3>
              <ul className={styles.daftar}>
                {isi.length === 0 && <li className={styles.kosong}>Belum ada ide di sini</li>}
                {isi.map((item) => {
                  const diseret = seret?.teks === item.teks;
                  const kartu = (
                    <li
                      key={item.teks}
                      ref={(el) => {
                        if (el) refCatatan.current.set(item.teks, el);
                        else refCatatan.current.delete(item.teks);
                      }}
                      tabIndex={0}
                      aria-describedby="petunjuk-ide"
                      className={`${styles.catatan} ${diseret ? styles.sedangDiseret : ""}`}
                      style={{
                        ...(diseret && {
                          position: "fixed",
                          top: seret.r.top,
                          left: seret.r.left,
                          width: seret.r.width,
                          height: seret.r.height,
                          transform: `translate(${seret.dx}px, ${seret.dy}px) rotate(2deg) scale(1.03)`,
                        }),
                      }}
                      onPointerDown={mulaiSeret}
                      onPointerMove={(e) => geser(e, item.teks)}
                      onPointerUp={(e) => lepas(e, item.teks)}
                      onPointerCancel={batal}
                      onKeyDown={(e) => tombol(e, item)}
                      onClickCapture={(e) => {
                        if (baruDiseret.current) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      <div className={styles.isi}>
                        {item.jenis && (
                          <span className={styles.jenis}>{labelJenis[item.jenis]}</span>
                        )}
                        {item.tautan ? (
                          <Link href={item.tautan} className={styles.tautan} draggable={false}>
                            {item.teks}
                            <ArrowUpRight className={styles.panah} size={14} strokeWidth={2.2} aria-hidden="true" />
                          </Link>
                        ) : (
                          <span className={styles.teks}>{item.teks}</span>
                        )}
                      </div>
                      <span className={styles.pegangan} data-pegangan aria-hidden="true">
                        <GripVertical size={16} strokeWidth={2} />
                      </span>
                    </li>
                  );
                  return diseret ? (
                    <Fragment key={item.teks}>
                      <li aria-hidden="true" className={styles.lubang} style={{ height: seret.r.height }} />
                      {kartu}
                    </Fragment>
                  ) : (
                    kartu
                  );
                })}
              </ul>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
