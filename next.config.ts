import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Halaman persona lama sudah dilebur ke beranda — link yang terlanjur dibagikan tetap jalan
  async redirects() {
    return [
      { source: "/pelayan", destination: "/#pelayan", permanent: false },
      { source: "/pendamping", destination: "/#pendamping", permanent: false },
      { source: "/laporan-kerja", destination: "/rekam-jejak", permanent: false },
    ];
  },
};

export default nextConfig;
