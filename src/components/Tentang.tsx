import type { BabTentang } from "@/content/profil";
import { site } from "@/config/site";
import { sorotanSegmen } from "@/content/laporan-kerja";
import { Sorotan as DeretSorotan } from "./Sorotan";
import { Tombol } from "./Tombol";
import styles from "./Tentang.module.css";

type Sorotan = NonNullable<BabTentang["sorotan"]>[number];

// TODO: isi `sorotan` di src/content/profil.ts — selama kosong, kartu ini yang tampil.
// Lima kartu contoh supaya deretan yang bisa digeser kelihatan bentuknya.
const placeholder: Sorotan[] = Array.from({ length: 5 }, (_, i) => ({
  judul: `Judul sorotan ${i + 1}`,
  teks: "Teks singkat 1–2 kalimat yang menjelaskan sorotan ini.",
  href: "#",
}));

/**
 * Kartu bab: yang ditulis manual di profil.ts dipakai lebih dulu; kalau kosong,
 * diambil dari rekam jejak dengan segmen yang sama supaya kartunya menuju
 * halaman detail yang sudah ada. Placeholder hanya kalau dua-duanya kosong.
 */
function kartuSorotan(bab: BabTentang) {
  if (bab.sorotan?.length) return bab.sorotan;
  const dariRekamJejak = sorotanSegmen(bab.id);
  return dariRekamJejak.length ? dariRekamJejak : placeholder;
}

export function Tentang({ bab: daftarBab }: { bab: BabTentang[] }) {
  return (
    <section id="tentang" className={styles.tentang} aria-labelledby="tentang-judul">
      <div className="wadah">
        <h2 id="tentang-judul" className="sr-only">
          Tentang saya
        </h2>

        <ol className={styles.daftar}>
          {daftarBab.map((bab) => (
            <li key={bab.id} id={bab.id} className={styles.bab}>
              <div className={styles.kiri}>
                <p className={styles.labelBab}>
                  <span>{bab.label}</span>
                </p>
                <h3 className={styles.judul}>{bab.judul}</h3>

                <div className={styles.isi}>
                  {bab.paragraf?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}

                  {bab.tautan && (
                    <div className={styles.tautan}>
                      <Tombol href={site.tautan[bab.tautan.href]} varian="teks">
                        {bab.tautan.label} <span aria-hidden="true">→</span>
                      </Tombol>
                    </div>
                  )}
                </div>
              </div>

              {/* Bab yang sorotannya sudah terisi ditutup fun fact; yang masih
                  placeholder ditutup tautan ke seluruh rekam jejak. */}
              <DeretSorotan
                kartu={kartuSorotan(bab)}
                label={bab.label}
                funFakta={bab.sorotan?.length ? bab.funFakta : undefined}
                hrefSemua={
                  bab.tanpaTautanUmum ? undefined : `${site.tautan.rekamJejak}?peran=${bab.id}`
                }
                cta={bab.cta}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
