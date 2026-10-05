import { execFileSync } from "node:child_process";

/**
 * Tanggal commit terakhir yang menyentuh `berkas` (path relatif dari akar proyek).
 * Dipakai di komponen server, jadi dihitung saat build/render, bukan di browser.
 * Kalau riwayat git tidak tersedia (mis. build di hosting yang tidak menyertakan folder
 * .git, atau berkasnya belum pernah di-commit), dipakai waktu build — yang berubah setiap
 * kali situs dibangun ulang (tiap push).
 */
export function tanggalCommitTerakhir(berkas: string): Date {
  try {
    const keluaran = execFileSync("git", ["log", "-1", "--format=%cI", "--", berkas], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5000,
    }).trim();
    const tanggal = new Date(keluaran);
    if (keluaran && !Number.isNaN(tanggal.getTime())) return tanggal;
  } catch {
    // git tidak ada / bukan repositori: pakai waktu build di bawah.
  }
  return new Date();
}

/** Contoh: "5 Oktober 2026" (zona waktu WIB, supaya sama di server mana pun). */
export function formatTanggalId(tanggal: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(tanggal);
}
