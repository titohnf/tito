import { Redis } from "@upstash/redis";

/**
 * Penghitung dukungan dari foto hero yang "dicoblos".
 * GET  → { jumlah }
 * POST { aksi: "dukung" | "cabut" } → { jumlah }
 * Batas 1 dukungan per browser dijaga di sisi klien (src/lib/dukungan.ts).
 */

const KUNCI = "dukungan:jumlah";

// Dibuat saat request, bukan saat modul dimuat, agar `next build` tetap aman tanpa env var
function redis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

const tanpaCache = { "Cache-Control": "no-store" };

export async function GET() {
  const jumlah = (await redis().get<number>(KUNCI)) ?? 0;
  return Response.json({ jumlah }, { headers: tanpaCache });
}

export async function POST(req: Request) {
  const { aksi } = await req.json().catch(() => ({}));
  const db = redis();

  if (aksi === "dukung") {
    return Response.json({ jumlah: await db.incr(KUNCI) }, { headers: tanpaCache });
  }

  if (aksi === "cabut") {
    let jumlah = await db.decr(KUNCI);
    // Jangan sampai minus
    if (jumlah < 0) {
      await db.set(KUNCI, 0);
      jumlah = 0;
    }
    return Response.json({ jumlah }, { headers: tanpaCache });
  }

  return Response.json({ error: "Aksi tidak dikenal" }, { status: 400 });
}
