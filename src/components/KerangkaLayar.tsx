import styles from "./KerangkaLayar.module.css";

/**
 * Ilustrasi kerangka layar (placeholder) — dipakai selama screenshot asli belum ada.
 * `varian="dashboard"` untuk sistem internal, `"website"` untuk tampilan website.
 */
export function KerangkaLayar({
  varian = "dashboard",
  keterangan = "Screenshot menyusul",
}: {
  varian?: "dashboard" | "website";
  keterangan?: string;
}) {
  return (
    <figure className={styles.bingkai} aria-label={keterangan}>
      <div className={styles.bilah} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {varian === "dashboard" ? (
        <div className={styles.dashboard} aria-hidden="true">
          <div className={styles.samping}>
            <i /> <i /> <i /> <i />
          </div>
          <div className={styles.utama}>
            <div className={styles.statistik}>
              <b /> <b /> <b />
            </div>
            <div className={styles.tabel}>
              <i /> <i /> <i /> <i /> <i />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.website} aria-hidden="true">
          <i className={styles.besar} />
          <i className={styles.sedang} />
          <div className={styles.kartu}>
            <b /> <b /> <b />
          </div>
        </div>
      )}
      <figcaption className={styles.keterangan}>{keterangan}</figcaption>
    </figure>
  );
}
