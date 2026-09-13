import Link from "next/link";
import type { Konten, Tulisan, Pemikiran, Video } from "@/content/konten";
import { formatTanggal } from "@/content/konten";
import styles from "./KartuKonten.module.css";

function Meta({ tipe, contoh, info }: { tipe: string; contoh?: boolean; info?: string }) {
  return (
    <p className={styles.meta}>
      <span>{tipe}</span>
      {info && <span className={styles.info}>{info}</span>}
      {contoh && <span className={styles.contoh}>Contoh</span>}
    </p>
  );
}

function KartuTulisan({ item }: { item: Tulisan }) {
  return (
    <Link href={`/tulisan/${item.slug}`} className={`${styles.kartu} ${styles.tulisan}`}>
      <Meta tipe="Tulisan" info={`${item.menitBaca} menit baca`} contoh={item.contoh} />
      <div className={styles.tulisanIsi}>
        <div className={styles.tulisanTeks}>
          <h3 className={styles.judulTulisan}>{item.judul}</h3>
          <p className={styles.pengantar}>{item.pengantar}</p>
        </div>
        <div className={styles.gambarKecil} aria-hidden="true">
          {item.gambar && <img src={item.gambar} alt="" loading="lazy" />}
        </div>
      </div>
      <p className={styles.kaki}>
        <time dateTime={item.tanggal}>{formatTanggal(item.tanggal)}</time>
        <span className={styles.panah} aria-hidden="true">
          Baca →
        </span>
      </p>
    </Link>
  );
}

function KartuPemikiran({ item }: { item: Pemikiran }) {
  return (
    <article className={`${styles.kartu} ${styles.pemikiran}`}>
      <Meta tipe="Pemikiran" contoh={item.contoh} />
      <p className={styles.teksPemikiran}>{item.teks}</p>
      <p className={styles.kaki}>
        <time dateTime={item.tanggal}>{formatTanggal(item.tanggal)}</time>
      </p>
    </article>
  );
}

function KartuVideo({ item }: { item: Video }) {
  const adaVideo = Boolean(item.youtubeId);
  const href = adaVideo ? `https://www.youtube.com/watch?v=${item.youtubeId}` : "#pikiran";

  return (
    <a
      href={href}
      className={`${styles.kartu} ${styles.video}`}
      {...(adaVideo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className={styles.thumbnail}>
        {adaVideo && (
          <img
            src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
          />
        )}
        <span className={styles.play} aria-hidden="true" />
        {item.durasi && <span className={styles.durasi}>{item.durasi}</span>}
      </div>
      <Meta tipe="Video" info="YouTube ↗" contoh={item.contoh} />
      <h3 className={styles.judulVideo}>
        {item.judul}
        {adaVideo && <span className="sr-only"> (buka YouTube di tab baru)</span>}
      </h3>
      <p className={styles.kaki}>
        <time dateTime={item.tanggal}>{formatTanggal(item.tanggal)}</time>
      </p>
    </a>
  );
}

export function KartuKonten({ item }: { item: Konten }) {
  switch (item.tipe) {
    case "tulisan":
      return <KartuTulisan item={item} />;
    case "pemikiran":
      return <KartuPemikiran item={item} />;
    case "video":
      return <KartuVideo item={item} />;
  }
}
