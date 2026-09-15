import { gambarOg, ukuranOg } from "@/lib/og";
import { hero } from "@/content/profil";
import { site } from "@/config/site";

export const alt = site.judulSeo;
export const size = ukuranOg;
export const contentType = "image/png";

export default function OgImage() {
  const { awal, kata, akhir } = hero.julukan;
  return gambarOg(`${awal} ${kata[0]} ${akhir}`, hero.catatanTombol);
}
