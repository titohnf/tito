import { Redis } from "@upstash/redis";

/**
 * Penghitung klik tombol WhatsApp.
 * POST { lokasi, halaman }  → menambah hitungan hari ini + total.
 * GET  ?kunci=<KLIK_RAHASIA>&hari=14 → ringkasan klik per lokasi (total dan per hari).
 *
 * Yang disimpan hanya angka per lokasi dan per hari (hash Redis), tanpa data
 * pengunjung. GET mati (404) kalau KLIK_RAHASIA belum diisi.
 */

const POLA_LOKASI = /^[a-z0-9-]{1,40}$/;
const POLA_HALAMAN = /^\/[a-z0-9\-/]{0,80}$/i;
const tanpaCache = { "Cache-Control": "no-store" };

function redis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

/** Tanggal WIB (UTC+7), format YYYY-MM-DD. */
function hariIni(offsetHari = 0) {
  return new Date(Date.now() + 7 * 3600e3 - offsetHari * 86400e3).toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  const { lokasi, halaman } = await req.json().catch(() => ({}));
  if (typeof lokasi !== "string" || !POLA_LOKASI.test(lokasi)) {
    return Response.json({ error: "Lokasi tidak sah" }, { status: 400 });
  }
  const halamanAman = typeof halaman === "string" && POLA_HALAMAN.test(halaman) ? halaman : "/";

  const db = redis();
  await Promise.all([
    db.hincrby("klik-wa:total", lokasi, 1),
    db.hincrby(`klik-wa:${hariIni()}`, lokasi, 1),
    db.hincrby("klik-wa:halaman", halamanAman, 1),
  ]);
  return new Response(null, { status: 204 });
}

export async function GET(req: Request) {
  const rahasia = process.env.KLIK_RAHASIA;
  const url = new URL(req.url);
  if (!rahasia || url.searchParams.get("kunci") !== rahasia) {
    return new Response("Not found", { status: 404 });
  }

  const hari = Math.min(Math.max(Number(url.searchParams.get("hari")) || 14, 1), 90);
  const db = redis();
  const tanggal = Array.from({ length: hari }, (_, i) => hariIni(i));
  const [total, halaman, ...perHari] = await Promise.all([
    db.hgetall<Record<string, number>>("klik-wa:total"),
    db.hgetall<Record<string, number>>("klik-wa:halaman"),
    ...tanggal.map((t) => db.hgetall<Record<string, number>>(`klik-wa:${t}`)),
  ]);

  return Response.json(
    {
      total: total ?? {},
      halaman: halaman ?? {},
      perHari: Object.fromEntries(tanggal.map((t, i) => [t, perHari[i] ?? {}]).filter(([, v]) => Object.keys(v as object).length)),
    },
    { headers: tanpaCache },
  );
}
