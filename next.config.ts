import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    formats: ["image/avif", "image/webp"],
  },
  // Aset di public/ ganti nama file kalau isinya berubah, jadi aman di-cache setahun
  async headers() {
    const abadi = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/images/:path*", headers: abadi },
      { source: "/videos/:path*", headers: abadi },
    ];
  },
  // Halaman persona lama sudah dilebur ke beranda — link yang terlanjur dibagikan tetap jalan
  async redirects() {
    return [
      { source: "/pelayan", destination: "/#pelayan", permanent: false },
      { source: "/pendamping", destination: "/#pendamping", permanent: false },
      { source: "/laporan-kerja", destination: "/rekam-jejak", permanent: false },
      // Cerita Tera pindah jadi satu entri rekam jejak (kategori Pelayan Rakyat)
      { source: "/tera", destination: "/rekam-jejak/tera", permanent: false },
    ];
  },
};

export default nextConfig;
