import { ImageResponse } from "next/og";

export const alt = "Tito Hanafi — Desainer Perwakilan Rakyat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function muatFont(family: string, teks: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(teks)}`
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error("Font OG gagal dimuat");
  return (await fetch(url)).arrayBuffer();
}

export default async function OgImage() {
  const atas = "TITO HANAFI";
  const sapaan = "Hi, saya Tito";
  const julukan = "Desainer Perwakilan Rakyat";
  const bawah = "Terbuka untuk diskusi produk & ide";

  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 500 }[] = [];
  try {
    fonts = [
      { name: "Geist", data: await muatFont("Geist:wght@500", sapaan + julukan + bawah), weight: 500 },
      { name: "Geist Mono", data: await muatFont("Geist+Mono:wght@400", atas), weight: 400 },
    ];
  } catch {
    // fallback ke font bawaan kalau Google Fonts tidak bisa diakses saat build
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FAFAF8",
          color: "#121211",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 24, letterSpacing: 2, color: "#9C9B95" }}>
          {atas}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.05, letterSpacing: -3.5 }}>
          <div>{sapaan}</div>
          <div style={{ color: "#9C9B95" }}>{julukan}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#62615C" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2F9E5B", marginRight: 16 }} />
          {bawah}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
