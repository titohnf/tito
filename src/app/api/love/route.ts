import { Redis } from "@upstash/redis";

/**
 * Penghitung "love" per item (tulisan, proyek rekam jejak, testimoni).
 * GET  ?ids=a:b,c:d          → { "a:b": 3, "c:d": 0 }
 * POST { id, aksi: "love" | "batal" } → { jumlah }
 *
 * Satu GET mengambil semua id sekaligus lewat MGET — satu halaman berisi belasan
 * kartu tetap jadi satu request, bukan satu request per kartu.
 * Batas 1 love per browser dijaga di sisi klien (src/lib/love.ts).
 */

/** Bentuk id: "<jenis>:<slug>", mis. "tulisan:contoh-tulisan-kedua". */
const POLA_ID = /^[a-z0-9-]{1,24}:[a-z0-9-]{1,64}$/i;

/** Pagar supaya satu request tidak bisa dipakai menyapu ribuan kunci sekaligus. */
const MAKS_ID = 60;

const kunci = (id: string) => `love:${id}`;

function redis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

const tanpaCache = { "Cache-Control": "no-store" };

export async function GET(req: Request) {
  const ids = (new URL(req.url).searchParams.get("ids") ?? "")
    .split(",")
    .filter((id) => POLA_ID.test(id))
    .slice(0, MAKS_ID);

  if (ids.length === 0) return Response.json({}, { headers: tanpaCache });

  const nilai = await redis().mget<(number | null)[]>(...ids.map(kunci));
  const hasil = Object.fromEntries(ids.map((id, i) => [id, nilai[i] ?? 0]));
  return Response.json(hasil, { headers: tanpaCache });
}

export async function POST(req: Request) {
  const { id, aksi } = await req.json().catch(() => ({}));

  if (typeof id !== "string" || !POLA_ID.test(id)) {
    return Response.json({ error: "Id tidak sah" }, { status: 400 });
  }

  const db = redis();

  if (aksi === "love") {
    return Response.json({ jumlah: await db.incr(kunci(id)) }, { headers: tanpaCache });
  }

  if (aksi === "batal") {
    let jumlah = await db.decr(kunci(id));
    // Jangan sampai minus
    if (jumlah < 0) {
      await db.set(kunci(id), 0);
      jumlah = 0;
    }
    return Response.json({ jumlah }, { headers: tanpaCache });
  }

  return Response.json({ error: "Aksi tidak dikenal" }, { status: 400 });
}
