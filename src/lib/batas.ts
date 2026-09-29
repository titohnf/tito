import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Pembatas laju untuk endpoint publik (/api/klik dan /api/love), supaya tidak
 * bisa dibanjiri permintaan. Kuncinya IP pengunjung; angkanya di Redis yang sama.
 * Kalau Redis bermasalah, permintaan tetap diloloskan — hitungan yang meleset
 * lebih murah daripada fitur yang mati.
 */
const pembatas = new Map<string, Ratelimit>();

function ambil(nama: string, jumlah: number, menit: number) {
  let p = pembatas.get(nama);
  if (!p) {
    p = new Ratelimit({
      redis: new Redis({
        url: process.env.KV_REST_API_URL!,
        token: process.env.KV_REST_API_TOKEN!,
      }),
      limiter: Ratelimit.slidingWindow(jumlah, `${menit} m`),
      prefix: `batas:${nama}`,
    });
    pembatas.set(nama, p);
  }
  return p;
}

function ipDari(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonim";
}

/** Mengembalikan Response 429 kalau melewati batas, atau null kalau boleh lanjut. */
export async function tahanKalauBerlebih(
  req: Request,
  nama: string,
  jumlah: number,
  menit = 1,
): Promise<Response | null> {
  try {
    const { success, reset } = await ambil(nama, jumlah, menit).limit(ipDari(req));
    if (success) return null;
    const tunggu = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return Response.json(
      { error: "Terlalu banyak permintaan" },
      { status: 429, headers: { "Retry-After": String(tunggu), "Cache-Control": "no-store" } },
    );
  } catch {
    return null;
  }
}
